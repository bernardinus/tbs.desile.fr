'use strict';

/**
 * @ngdoc function
 * @name tbsApp.controller:ItemDropListCtrl
 * @description
 * # ItemDropListCtrl
 * Controller of the tbsApp
 */
angular.module('tbsApp').controller('ItemDropListCtrl', function($scope, UserData, DailyBonus, ItemCounter, Rebirth, RStage) {
    $scope.nb_th = UserData.get('item_drop_nb_th', 0);
    $scope.items = {};

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

            RStage.items.all(function(data) {
                var _item = null;

                for (var i = 0; i < data.length; ++i) {
                    _item = data[i];
                    if (!$scope.items[_item.item_ref]) {
                        $scope.items[_item.item_ref] = {
                            ref : _item.item_ref,
                            name : _item.item_name,
                            _stages : {},
                            stages : [],
                            needed : function() {
                                return (($scope.item_needed[this.ref] || 0) + (needed_rebirth.current[this.ref] || 0)) - ($scope.have_items[this.ref] || 0);
                            }
                        };
                    }
                    if (!$scope.items[_item.item_ref]._stages[_item.stage_ref]) {
                        $scope.items[_item.item_ref]._stages[_item.stage_ref] = {
                            stage_ref : _item.stage_ref,
                            stamina : _item.stamina,
                            chapter_num : parseInt(_item.chapter_num),
                            drops : [],
                            expected : function() {
                                return this.drops.reduce(function(p, c) {
                                    return c.expected() + p;
                                }, 0);
                            },
                            stamina_cost : function() {
                                return (1.0 / this.expected()) * this.stamina;
                            },
                            average_cost : function() {
                                return parseFloat(this.stamina) / this.expected();
                            },
                            for_100_stamina : function() {
                                return (100.0 / this.stamina) * this.expected();
                            }
                        }
                    }

                    $scope.items[_item.item_ref]._stages[_item.stage_ref].drops.push({
                        count : _item.count,
                        percent : parseFloat(_item.percent),
                        chapter_num : parseInt(_item.chapter_num),
                        expected : function() {
                            var base_percent = this.percent * 100;
                            var th_percent = base_percent * (1 + 0.25 * $scope.nb_th);
                            var rounded_percent = parseInt(parseInt(th_percent * 10) / 10);
                            if ($scope.selected_bonus.name == 'Items drop rate x 2' && $scope.selected_bonus.chapters.indexOf(this.chapter_num) != -1) {
                                rounded_percent *= 2;
                            }
                            return (this.count * rounded_percent) / 100;
                        }
                    });
                }
                for (var key1 in $scope.items) {
                    for (var key2 in $scope.items[key1]._stages) {
                        $scope.items[key1].stages.push($scope.items[key1]._stages[key2]);
                    }
                    delete $scope.items[key1]._stages;
                }
            });
        });
    });

    $scope.order_opts = {
        name : 'expected',
        desc : true
    };

    $scope.sort_fn = function(item) {
        return item[$scope.order_opts.name]();
    }

    $scope.expected_sort = function(stage) {
        return stage.expected();
    };

    $scope.dailyBonusConcerned = function(stage) {
        if ($scope.selected_bonus.name != 'Items drop rate x 2') {
            return false;
        } else {
            return $scope.selected_bonus.chapters.indexOf(stage.chapter_num) != -1;
        }
    };

    var items_needed_default = UserData.get('items_needed_default', false);
    $scope.filters = {
        only_needed_items : items_needed_default,
        only_needed_monsters : false
    };

    $scope.filterNeeded = function(items) {
        var result = [];
        angular.forEach(items, function(item) {
            if ($scope.filters.only_needed_items == false) {
                result.push(item);
            } else {
                if (item.needed() > 0) {
                    result.push(item);
                }
            }
        });
        return result;
    };

    $scope.change_nb_th = function() {
        UserData.set('item_drop_nb_th', $scope.nb_th);
    };

    $scope.filter_zero_exp = function(stage) {
        return stage.expected() != 0;
    }
});
