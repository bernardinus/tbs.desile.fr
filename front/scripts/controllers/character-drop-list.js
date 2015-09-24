'use strict';

/**
 * @ngdoc function
 * @name tbsApp.controller:CharacterDropListCtrl
 * @description
 * # CharacterDropListCtrl
 * Controller of the tbsApp
 */
angular.module('tbsApp').controller('CharacterDropListCtrl', function($scope, UserData, DailyBonus, RStage) {
    $scope.nb_ng = UserData.get('char_drop_nb_ng', 0);
    $scope.nb_ng_pro = UserData.get('char_drop_nb_ng_pro', 0);
    var skill_boosts = UserData.get('boost', {});

    // currentDayNumber start at 0, num in all_bonuses are numbered 1 -> 15
    $scope.difference = DailyBonus.currentDayNumber() + 1;
    $scope.all_bonuses = DailyBonus.allBonuses();
    $scope.selected_bonus = null;
    for (var i = 0; i < $scope.all_bonuses.length; ++i) {
        if ($scope.all_bonuses[i].num == $scope.difference) {
            $scope.selected_bonus = $scope.all_bonuses[i];
        }
    }

    var __characters = {};
    $scope.characters = [];
    RStage.characters.all(function(data) {
        var char_stage = null;
        for (var i = 0; i < data.length; ++i) {
            char_stage = data[i];
            if (!__characters[char_stage.character_ref]) {
                __characters[char_stage.character_ref] = {
                    ref : char_stage.character_ref,
                    name : char_stage.character_name,
                    stages : [],
                    current_sb : function() {
                        return skill_boosts[this.ref] || 0;
                    }
                };
            }
            __characters[char_stage.character_ref].stages.push({
                stage_ref : char_stage.stage_ref,
                chapter_num : parseInt(char_stage.chapter_num),
                char_ref : char_stage.character_ref,
                count : parseInt(char_stage.count),
                percent : parseFloat(char_stage.percent),
                stamina : char_stage.stamina,
                expected : function() {
                    // Effective drop rate = base drop rate
                    //   * (1 + number of negotiator activations in the last turn     * 2
                    //        + number of negotiator pro activations in the last turn * 8)
                    var base_percent = this.percent;
                    if ($scope.selected_bonus.name == 'Monsters drop rate x 2' && $scope.selected_bonus.chapters.indexOf(this.chapter_num) != -1) {
                        base_percent *= 2;
                    }
                    var bonus = 1 + ($scope.nb_ng * 2) + ($scope.nb_ng_pro * 8);
                    if(bonus > 18){ bonus = 18; }
                    var base_rate = Math.min(1, base_percent * bonus);
                    var p = Math.pow(1 - base_rate, this.count);
                    var multiple_base = 1 - p;
                    return Math.min(1, multiple_base);
                },
                stamina_cost : function() {
                    return Math.ceil(100 / (this.expected() * 100)) * this.stamina;
                },
                avg_stamina_cost : function() {
                    return this.expected() * this.stamina;
                }
            });
        }
        angular.forEach(__characters, function(value, key) {
            if (!skill_boosts[key] || skill_boosts[key] < 100) {
                $scope.characters.push(value);
            }
        });
    });

    $scope.dailyBonusConcerned = function(stage) {
        if ($scope.selected_bonus.name != 'Monsters drop rate x 2') {
            return false;
        } else {
            return $scope.selected_bonus.chapters.indexOf(stage.chapter_num) != -1;
        }
    };

    $scope.sort_expected = function(stage) {
        return stage.expected();
    };

    $scope.change_nb_ng = function() {
        UserData.set('char_drop_nb_ng', $scope.nb_ng);
    };
    $scope.change_nb_ng_pro = function() {
        UserData.set('char_drop_nb_ng_pro', $scope.nb_ng_pro);
    };

    $scope.filter_zero_exp = function(stage) {
        return stage.expected() != 0;
    }
});
