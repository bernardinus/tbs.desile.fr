'use strict';

/**
 * @ngdoc function
 * @name tbsApp.controller:CpsListCtrl
 * @description
 * # CpsListCtrl
 * Controller of the tbsApp
 */
angular.module('tbsApp').controller('CpsListCtrl', function($scope, RCps, UserData, DailyBonus) {
    $scope.nb_th = UserData.get('item_drop_nb_th', 0);
    $scope.nb_ng = UserData.get('char_drop_nb_ng', 0);
    $scope.nb_ng_pro = UserData.get('char_drop_nb_ng_pro', 0);
    var skill_boosts = UserData.get('boost', {});
    var have_character = UserData.get('have_character', {});

    // currentDayNumber start at 0, num in all_bonuses are numbered 1 -> 15
    $scope.difference = DailyBonus.currentDayNumber() + 1;
    $scope.all_bonuses = DailyBonus.allBonuses();
    $scope.selected_bonus = null;
    for (var i = 0; i < $scope.all_bonuses.length; ++i) {
        if ($scope.all_bonuses[i].num == $scope.difference) {
            $scope.selected_bonus = $scope.all_bonuses[i];
        }
    }

    $scope.nb_cb = UserData.get('cps_list_nb_cb', 0);

    /* Character drop bonus */
    var __stages = {};
    $scope.cps = [];
    RCps.all(function(data) {
        var char_stage = null;
        for (var i = 0; i < data.length; ++i) {
            char_stage = data[i];

            if (!__stages[char_stage.stage_ref]) {
                __stages[char_stage.stage_ref] = {
                    ref : char_stage.stage_ref,
                    chapter_num : parseInt(char_stage.chapter_num),
                    coins : parseInt(char_stage.coin),
                    stamina : parseInt(char_stage.stamina),
                    chars : [],
                    _coins : function() {
                        return this.coins * Math.pow(1.15, $scope.nb_cb);
                    },
                    coin_value : function() {
                        return this._coins() + this.chars.reduce(function(p, c) {
                            return p + c.coin_value();
                        }, 0);
                    },
                    cps : function() {
                        return this.coin_value() / this.stamina;
                    }
                };
            }
            __stages[char_stage.stage_ref].chars.push({
                stage_ref : char_stage.stage_ref,
                chapter_num : parseInt(char_stage.chapter_num),
                char_ref : char_stage.character_ref,
                count : parseInt(char_stage.count),
                percent : parseFloat(char_stage.percent),
                stamina : parseInt(char_stage.stamina),
                name : char_stage.character_name,
                expected : function() {
                    /* early return if not bonus day */
                    /*if($scope.selected_bonus.name == 'Monsters drop rate x 2' &&
                    $scope.selected_bonus.chapters.indexOf(this.chapter_num) == -1){
                    return 0;
                    }*/
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
                coin_value : function() {
                    if (!skill_boosts[this.char_ref] || skill_boosts[this.char_ref] < 100) {
                        return 3000 * this.expected();
                    } else {
                        return 0;
                    }
                },
                cps : function() {
                    return this.coin_value() / this.stamina;
                },
                sb : function(value) {
                    if (angular.isDefined(value)) {
                        skill_boosts[this.char_ref] = value;
                        UserData.set('boost', skill_boosts);
                    }
                    return skill_boosts[this.char_ref] || 0;
                },
                have : function() {
                    return have_character[this.char_ref];
                }
            });
        }
        angular.forEach(__stages, function(value, key) {
            $scope.cps.push(value);
        });
        var coins_cc3 = parseInt(UserData.get('coins_cc3', 8000));
        $scope.cps.push({
                    ref : 'CC3',
                    chapter_num : 0,
                    coins : coins_cc3,
                    stamina : 20,
                    chars : [],
                    _coins : function() {
                        return this.coins * Math.pow(1.15, $scope.nb_cb);
                    },
                    coin_value : function() {
                        return this._coins();
                    },
                    cps : function() {
                        return this.coin_value() / this.stamina;
                    }
                });
    });

    /* filters */
    $scope.filters = {
        'positive_expected' : true,
        'with_drops' : true,
        '100sb' : true
    };

    $scope.filter_zero_exp = function(stage) {
        return stage.expected() != 0;
    };

    $scope.filter_no_drop = function(item) {
        return item.stages.reduce(function(p, c) {
            return p + c.expected();
        }, 0) != 0;
    };

    $scope.filter_100sb = function(char) {
        return skill_boosts[char.char_ref] != 100;
    }

    $scope.sort_expected = function(stage) {
        return stage.expected();
    };

    $scope.sort_cps = function(stage) {
        return stage.cps();
    }
});
