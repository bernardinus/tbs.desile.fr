'use strict';

/**
 * @ngdoc function
 * @name tbsApp.controller:StageListCtrl
 * @description
 * # StageListCtrl
 * Controller of the tbsApp
 */
angular.module('tbsApp').controller('StageListCtrl', function($scope, $routeParams, $modal, $filter, UserData, InGame, RChapter, RStage) {
    var user_stage_exp = UserData.get('user_stage_exp', {});
    
    var run_per_day = function(stage) {
        return Math.floor((24 * 12) / stage.stamina);
    }

    localStorage.removeItem('stage_exp');
    localStorage.removeItem('stage_coin');

    var stages_resource = null;
    if (!$routeParams.chapterId) {
        stages_resource = RStage.all();
    } else {
        stages_resource = RStage.inChapter.all({ ref: $routeParams.chapterId });
        $scope.chapter  = RChapter.get({ ref: $routeParams.chapterId });
    }

    $scope.last_chapter = InGame.LAST_CHAPTER;
    $scope.stages = [];
    stages_resource.$promise.then(function(stage_data) {
        for (var i = 0; i < stage_data.length; ++i) {
            var stage = angular.copy(stage_data[i]);
            stage['run_per_day'] = run_per_day(stage);
            stage.xp = parseInt(stage.exp);
            stage.exp       = function(){
                return angular.isDefined(user_stage_exp[this.ref])? 
                    $filter('average')(user_stage_exp[this.ref]):
                    this.xp;
            };
            stage.coin      = parseInt(stage.coin);
            stage.exp_stam  = function(){ return this.exp() / this.stamina; };
            stage.coin_stam = stage.coin / stage.stamina;
            stage.exp_day   = function(){ return this.exp() * this.run_per_day; };
            $scope.stages.push(stage);
        }
    });

    $scope.sort_opts = {
        fn: null,
        pred : '',
        desc : false
    };

    $scope.sort_change = function(name) {
        if (name == $scope.sort_opts.pred) {
            $scope.sort_opts.desc = !$scope.sort_opts.desc;
        } else {
            $scope.sort_opts.pred = name;
            $scope.sort_opts.fn = function(stage){ 
                if(angular.isFunction(stage[name])){ 
                    return stage[name]();
                } else {
                    return stage[name];
                }
            };
            $scope.sort_opts.desc = true;
        }
    };

    
    $scope.edit = function(ref){
        var modalInstance = $modal.open({
            templateUrl: 'views/stage-edit.html',
            controller: 'StageEditCtrl',
            size: 'lg',
            resolve: {
                stage_exp: function(){
                    return user_stage_exp[ref];
                },
                ref: function(){
                    return ref;
                }
            }
        });
        modalInstance.result.then(function(val){
            if(val.exps != undefined){
                user_stage_exp[ref] = val.exps;
            }
            UserData.set('user_stage_exp', user_stage_exp);
        });
    };

    $scope.stage_drop = {};
    RStage.items.all(function(data) {
        for (var i = 0; i < data.length; ++i) {
            if (!$scope.stage_drop[data[i].stage_ref]) {
                $scope.stage_drop[data[i].stage_ref] = [];
            }
            $scope.stage_drop[data[i].stage_ref].push(data[i].item_name);
        }
    });

    $scope.stage_drop_pop = function(ref) {
        $scope.popover_ = "";
        var data = [];
        for (var i = 0; i < $scope.stage_drop[ref].length; ++i) {
            if (data.indexOf($scope.stage_drop[ref][i]) == -1) {
                data.push($scope.stage_drop[ref][i]);
            }
        }
        $scope.popover_ += data.join(', ');
    };

    $scope.char_drop = {};
    RStage.characters.all(function(data) {
        for (var i = 0; i < data.length; ++i) {
            if (!$scope.char_drop[data[i].character_ref]) {
                $scope.char_drop[data[i].stage_ref] = [];
            }
            $scope.char_drop[data[i].stage_ref].push({
                character_ref : data[i].character_ref,
                percent : data[i].percent,
                name : data[i].character_name
            });
        }
    });

    $scope.char_drop_pop = function(ref) {
        $scope.popover_ = "";
        var data = [];
        for (var i = 0; i < $scope.char_drop[ref].length; ++i) {
            if (data.indexOf($scope.char_drop[ref][i]) == -1) {
                data.push($scope.char_drop[ref][i].name);
            }
        }
        $scope.popover_ = data.join(', ');
    };

    $scope.what_drop_from = function(stage_ref) {
        $modal.open({
            templateUrl : 'views/stage-drop.html',
            controller : 'StageDropCtrl',
            resolve : {
                drops : function() {
                    return $scope.stage_drop[stage_ref] || [];
                },
                stage_ref : function() {
                    return stage_ref;
                }
            }
        });
    };

    $scope.who_drop_from = function(stage_ref) {
        $modal.open({
            templateUrl : 'views/stage-char-drop.html',
            controller : 'StageCharDropCtrl',
            resolve : {
                drops : function() {
                    return $scope.char_drop[stage_ref] || [];
                },
                stage_ref : function() {
                    return stage_ref;
                }
            }
        });
    };
});
