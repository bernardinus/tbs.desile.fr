'use strict';

/**
 * @ngdoc function
 * @name tbsApp.controller:ItemListCtrl
 * @description
 * # ItemListCtrl
 * Controller of the tbsApp
 */
angular.module('tbsApp').controller('ItemListCtrl', function($scope, $modal, RStage, RItem, UserData, ItemCounter, Rebirth) {
    $scope.items = RItem.all();

    $scope.have_items = UserData.get('have_items', {});

    /* contains item already used to achieve job levels */
    ItemCounter.get().then(function(data){
        $scope.item_needed = data.item_needed;
        $scope.item_needed_by_char = data.item_needed_by_char;
        $scope.future_item_needed = data.future_item_needed;
        $scope.future_item_needed_by_char = data.future_item_needed_by_char;
        
        /* Rebirth items */
        Rebirth.item_list().then(function(rebirths) {
            $scope.needed_rebirth = rebirths;
    
            $scope.filter_only_needs = function(item) {
                if ($scope.filters.only_needed_items == false) {
                    return true;
                }
                if($scope.filters.with_future_items){
                    return ((($scope.item_needed[item.ref] || 0) 
                        + ($scope.needed_rebirth.current[item.ref] || 0) 
                        + ($scope.needed_rebirth.current[item.ref] || 0)) - ($scope.have_items[item.ref] || 0)) > 0;
                } else {
                    return ((($scope.item_needed[item.ref] || 0) 
                        + ($scope.needed_rebirth.current[item.ref] || 0)) - ($scope.have_items[item.ref] || 0)) > 0;
                }
                
            };
        });
    });
    
    

    $scope.item_drop = {};
    RStage.items.all(function(data) {
        for (var k = 0; k < data.length; ++k) {
            if (! $scope.item_drop[data[k].item_ref]) {
                $scope.item_drop[data[k].item_ref] = [];
            }
            $scope.item_drop[data[k].item_ref].push(data[k].stage_ref);
        }
    });

    $scope.drop_from = function(item_name, item_ref) {
        $modal.open({
            templateUrl : 'views/item-drop.html',
            controller : 'ItemDropCtrl',
            resolve : {
                drop : function() {
                    return $scope.item_drop[item_ref] || [];
                },
                name : function() {
                    return item_name;
                }
            }
        });
    };

    $scope.drop_from_pop = function(item_ref) {
        $scope.popover_ = null;
        var data = [];
        if ($scope.item_drop[item_ref]) {
            for (var i = 0; i < $scope.item_drop[item_ref].length; ++i) {
                if (data.indexOf($scope.item_drop[item_ref][i]) == -1) {
                    data.push($scope.item_drop[item_ref][i]);
                }
            }
            $scope.popover_ = data.join(', ');
        }
    };

    $scope.whom_for = function(item_ref) {
        $modal.open({
            templateUrl : 'views/item-character-detail.html',
            controller : 'ItemCharacterDetailCtrl',
            resolve : {
                jobs : function() {
                    return $scope.item_needed_by_char[item_ref];
                },
                rebirths: function(){
                    return $scope.needed_rebirth.current_for[item_ref];
                },
                item_name: function(){ 
                    for(var i = 0; i < $scope.items.length; ++i){ 
                        if($scope.items[i].ref == item_ref){ 
                            return $scope.items[i].name;
                        }
                    }
                    return item_ref; 
                }
            }
        });
    };

    $scope.whom_for_pop = function(item) {
        var data = [];
        for (var key in $scope.item_needed_by_char[item.ref]) {
            if(data.indexOf(key) == -1){
                data.push(key);
            }
        }
        for (key in $scope.needed_rebirth.current_for[item.ref]) {
            if(data.indexOf(key) == -1){
                data.push(key);
            }
        }
        $scope.popover_ = data.join(', ');
    };

    $scope.future_whom_for = function(item_ref) {
        $modal.open({
            templateUrl : 'views/item-character-detail.html',
            controller : 'ItemCharacterDetailCtrl',
            resolve : {
                jobs : function() {
                    return $scope.future_item_needed_by_char[item_ref];
                },
                rebirths: function(){
                    return $scope.needed_rebirth.future_for[item_ref];
                },
                item_name: function(){ 
                    for(var i = 0; i < $scope.items.length; ++i){ 
                        if($scope.items[i].ref == item_ref){ 
                            return $scope.items[i].name;
                        }
                    }
                    return item_ref; 
                }
            }
        });
    };

    $scope.future_whom_for_pop = function(item_ref) {
        var data = [];
        for (var key in $scope.future_item_needed_by_char[item_ref]) {
            if(data.indexOf(key) == -1){
                data.push(key);
            }
        }
        for (var key in $scope.needed_rebirth.future_for[item_ref]) {
            if(data.indexOf(key) == -1){
                data.push(key);
            }
        }
        $scope.popover_ = data.join(', ');
    };

    $scope.change = function(ref) {
        if (isNaN($scope.have_items[ref]) || $scope.have_items[ref] == undefined) {
            $scope.have_items[ref] = 0;
        }
        UserData.set('have_items', $scope.have_items);
    };

    $scope.max_item = function(ref) {
        if (ref == 'coins') {
            return 9999999;
        } else {
            return 999;
        }
    };

    var items_needed_default = UserData.get('items_needed_default', false);
    var items_needed_future_default = UserData.get('items_needed_future_default', false);
    $scope.filters = {
        only_needed_items : items_needed_default,
        with_future_items: items_needed_future_default,
        only_needed_monsters : false
    };
});
