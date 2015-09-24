'use strict';

/**
 * @ngdoc function
 * @name tbsApp.controller:BuddyDropListCtrl
 * @description
 * # BuddyDropListCtrl
 * Controller of the tbsApp
 */
angular.module('tbsApp').controller('BuddyDropListCtrl', function($scope, RStage) {
    var buddies = {};
    $scope.buddies = [];
    
    RStage.buddies.all(function(data){
        for(var i = 0; i < data.length; ++i){
            var row = data[i];
            if(! buddies[row.buddy_ref]){
                buddies[row.buddy_ref] = {
                    ref: row.buddy_ref,
                    name: row.buddy_name,
                    rarity: row.rarity,
                    stages : []
                };
            }
            buddies[row.buddy_ref].stages.push({
                stage_ref: row.stage_ref,
                buddy_ref: row.buddy_ref,
                count: parseInt(row.count),
                percent: parseFloat(row.percent),
                stamina: parseInt(row.stamina),
                expected: function(){
                    var base_percent = this.percent;
                    /*if ($scope.selected_bonus.name == 'Buddies drop rate x 2' && $scope.selected_bonus.chapters.indexOf(this.chapter_num) != -1) {
                        base_percent *= 2;
                    }*/
                    var bonus = 1;
                    var base_rate = Math.min(1, base_percent * bonus);
                    var p = Math.pow(1 - base_rate, this.count);
                    var multiple_base = 1 - p;
                    return Math.min(1, multiple_base);
                },
                stamina_cost: function(){
                    return Math.ceil(100 / (this.expected() * 100)) * this.stamina;
                },
                avg_stamina_cost: function(){
                    return this.expected() * this.stamina;
                }
            });
        }
        angular.forEach(buddies, function(value, key){
            $scope.buddies.push(value);
        });
    });
    
    $scope.sort_expected = function(stage) {
        return stage.expected();
    };
});
