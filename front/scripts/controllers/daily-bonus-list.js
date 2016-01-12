'use strict';

/**
 * @ngdoc function
 * @name tbsApp.controller:DailyBonusListCtrl
 * @description
 * # DailyBonusListCtrl
 * Controller of the tbsApp
 */
angular.module('tbsApp').controller('DailyBonusListCtrl', function($scope, UserData, DailyBonus, InGame, ItemCounter, Rebirth, RStage) {
    $scope.nb_th = UserData.get('item_drop_nb_th', 0);
    var __items = {};
    $scope.items = [];
    var __characters = {};
    $scope.characters = [];
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

    $scope.have_items = UserData.get('have_items', {});
    ItemCounter.get().then(function(data) {
        $scope.item_needed = data.item_needed;
        $scope.future_item_needed = data.future_item_needed;

        var needed_rebirth;
        Rebirth.item_list().then(function(rebirths) {
            needed_rebirth = rebirths;

            /* Item Bonus */
            RStage.items.all(function(data) {
                var _item = null;
                for (var i = 0; i < data.length; ++i) {
                    _item = data[i];
                    if (!__items[_item.item_ref]) {
                        __items[_item.item_ref] = {
                            ref : _item.item_ref,
                            name : _item.item_name,
                            _stages : {},
                            stages : [],
                            needed : function() {
                                return (($scope.item_needed[this.ref] || 0) + (needed_rebirth.current[this.ref] || 0)) - ($scope.have_items[this.ref] || 0);
                            }
                        };
                    }
                    if (!__items[_item.item_ref]._stages[_item.stage_ref]) {
                        __items[_item.item_ref]._stages[_item.stage_ref] = {
                            stage_ref : _item.stage_ref,
                            stamina : _item.stamina,
                            drops : [],
                            expected : function() {
                                return this.drops.reduce(function(p, c) {
                                    return c.expected() + p;
                                }, 0);
                            },
                            stamina_cost : function() {
                                return (1.0 / this.expected()) * this.stamina;
                            },
                            for_100_stamina : function() {
                                return (100.0 / this.stamina) * this.expected();
                            }
                        }
                    }
                    __items[_item.item_ref]._stages[_item.stage_ref].drops.push({
                        count : _item.count,
                        percent : parseFloat(_item.percent),
                        chapter_num : parseInt(_item.chapter_num),
                        expected : function() {
                            if ($scope.selected_bonus.name == 'Items drop rate x 2' && $scope.selected_bonus.chapters.indexOf(this.chapter_num) == -1) {
                                return 0;
                            }
                            var base_percent = this.percent * 100;
                            var th_percent = base_percent * (1 + 0.25 * $scope.nb_th);
                            var rounded_percent = parseInt(parseInt(th_percent * 10) / 10);
                            if ($scope.selected_bonus.name == 'Items drop rate x 2' && $scope.selected_bonus.chapters.indexOf(this.chapter_num) != -1) {
                                rounded_percent *= 2;
                            }
                            //console.log(rounded_percent);
                            return (this.count * rounded_percent) / 100;
                        },
                    });
                }
                for (var key1 in __items) {
                    for (var key2 in __items[key1]._stages) {
                        __items[key1].stages.push(__items[key1]._stages[key2]);
                    }
                    delete __items[key1]._stages;
                }
                angular.forEach(__items, function(value, key) {
                    $scope.items.push(value);
                });
            });
        });
    });

    /* Character drop bonus */
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
                    /* early return if not bonus day */
                    if ($scope.selected_bonus.name == 'Monsters drop rate x 2' && $scope.selected_bonus.chapters.indexOf(this.chapter_num) == -1) {
                        return 0;
                    }
                    // Effective drop rate = base drop rate
                    //   * (1 + number of negotiator activations in the last turn     * 2
                    //        + number of negotiator pro activations in the last turn * 8)
                    var base_percent = this.percent;
                    if ($scope.selected_bonus.name == 'Monsters drop rate x 2' && $scope.selected_bonus.chapters.indexOf(this.chapter_num) != -1) {
                        base_percent *= 2;
                    }
                    var bonus = 1 + ($scope.nb_ng * 2) + ($scope.nb_ng_pro * 8);
                    if(bonus > InGame.neg_bonus_max){ bonus = InGame.neg_bonus_max; }
                    var base_rate = Math.min(1, base_percent * bonus);
                    var p = Math.pow(1 - base_rate, this.count);
                    var multiple_base = 1 - p;
                    return Math.min(1, multiple_base);
                },
                stamina_cost : function() {
                    return Math.ceil(100 / (this.expected() * 100)) * this.stamina;
                }
            });
        }
        angular.forEach(__characters, function(value, key) {
            if (!skill_boosts[key] || skill_boosts[key] < 100) {
                $scope.characters.push(value);
            }
        });
    });

    $scope.order_opts = {
        name : 'expected',
        reverse : true
    };

    $scope.sort_fn = function(stage) {
        //console.log($scope.order_opts);
        return stage[$scope.order_opts.name]();
    }
    /* filters */
    $scope.filter_zero_exp = function(stage) {
        return stage.expected() != 0;
    };

    $scope.filter_no_drop = function(item) {
        return item.stages.reduce(function(p, c) {
            return p + c.expected();
        }, 0) != 0;
    };

    var items_needed_default = UserData.get('items_needed_default', false);
    $scope.filters = {
        only_needed_items : items_needed_default,
        only_needed_monsters : false
    };

    $scope.filter_only_needs = function(item) {
        if ($scope.filters.only_needed_items == false) {
            return true;
        }
        return item.needed() > 0;
    };

    $scope.sort_expected = function(stage) {
        return stage.expected();
    };
});
