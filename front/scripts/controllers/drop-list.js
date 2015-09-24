'use strict';

/**
 * @ngdoc function
 * @name tbsApp.controller:DropListCtrl
 * @description
 * # DropListCtrl
 * Controller of the tbsApp
 */
angular.module('tbsApp').controller('DropListCtrl', function($scope, RStage) {
    $scope.stages = {};
    $scope.all_stages = [];
    var stages_to_skip = /(odin|baham|levia|tin|puppet|pudding|art-|chao-|valk-|lamia)/;

    RStage.all(function(stage_data) {
        var stage = null;
        //for(var i in stage_data){
        for (var i = 0; i < stage_data.length; ++i) {
            stage = stage_data[i];
            $scope.stages[stage.ref] = angular.copy(stage_data[i]);
            $scope.stages[stage.ref].ordre_ = parseInt($scope.stages[stage.ref].chapter_num) * 10 + parseInt($scope.stages[stage.ref].ordre);
            $scope.all_stages.push($scope.stages[stage.ref]);
        }
        RStage.items.all(function(item_data) {
            var item = null;
            var stages_items = {};
            for (var i = 0; i < item_data.length; ++i) {
                item = item_data[i];
                if (!stages_items[item.stage_ref]) {
                    stages_items[item.stage_ref] = {};
                }
                if (!stages_items[item.stage_ref].items) {
                    stages_items[item.stage_ref].items = {};
                }
                var key = item.item_ref + '#' + item.percent;
                if (!stages_items[item.stage_ref].items[key]) {
                    stages_items[item.stage_ref].items[key] = {
                        count : parseInt(item.count),
                        name : item.item_name,
                        percent : parseFloat(item.percent),
                        ref : item.item_ref
                    };
                } else {
                    stages_items[item.stage_ref].items[key].count += parseInt(item.count);
                }
            }

            angular.forEach(stages_items, function(value, key) {
                if (! stages_to_skip.test(key)) {
                    if (!$scope.stages[key].items) {
                        $scope.stages[key].items = [];
                    }
                    angular.forEach(value.items, function(val2, key2) {
                        $scope.stages[key].items.push(val2);
                    });
                }
            });
        });

        RStage.characters.all(function(char_data) {
            var char = null;
            for (var i = 0; i < char_data.length; ++i) {
                char = char_data[i];
                if (!$scope.stages[char.stage_ref]) {
                    $scope.stages[char.stage_ref] = {};
                }
                if (!$scope.stages[char.stage_ref].chars) {
                    $scope.stages[char.stage_ref].chars = [];
                }
                $scope.stages[char.stage_ref].chars.push(char);
            }
            //delete $scope.stages;
        });
        
        RStage.buddies.all(function(data) {
            var buddy = null;
            for (var i = 0; i < data.length; ++i) {
                buddy = data[i];
                if (!$scope.stages[buddy.stage_ref]) {
                    $scope.stages[buddy.stage_ref] = {};
                }
                if (!$scope.stages[buddy.stage_ref].buddies) {
                    $scope.stages[buddy.stage_ref].buddies = [];
                }
                $scope.stages[buddy.stage_ref].buddies.push(buddy);
            }
        });
    });
});
