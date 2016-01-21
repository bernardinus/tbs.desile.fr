'use strict';

/**
 * @ngdoc function
 * @name tbsApp.controller:BuddyListCtrl
 * @description
 * # BuddyListCtrl
 * Controller of the tbsApp
 */
angular.module('tbsApp').controller('BuddyListCtrl', function ($scope, $filter, RBuddy, UserData, deviceDetector) {
    $scope.had_buddies    = UserData.get('had_buddy',    {});
    $scope.have_buddies   = UserData.get('have_buddy',   {});
    $scope.qty_buddies    = UserData.get('qty_buddy',    {});
    $scope.want_buddies   = UserData.get('want_buddy',   {});
    $scope.evolve_buddies = UserData.get('evolve_buddy', {});
    if(jQuery.isArray($scope.had_buddies)   ){ $scope.had_buddies    = {}; }
    if(jQuery.isArray($scope.have_buddies)  ){ $scope.have_buddies   = {}; }
    if(jQuery.isArray($scope.qty_buddies)   ){ $scope.qty_buddies    = {}; }
    if(jQuery.isArray($scope.want_buddies)  ){ $scope.want_buddies   = {}; }
    if(jQuery.isArray($scope.evolve_buddies)){ $scope.evolve_buddies = {}; }
    
    /* filters init */
    $scope.filters = {
        'classes'  : [''],
        'bof_bot'  : '',
        'only_have': false,
        'only_had':  false,
        'only_not_had': false,
        'only_want': false,
        'evolution': false
    };
    
    RBuddy.all(function(data){
        var keyed_data = {};
        
        for(var i = 0; i < data.length; ++i){
            data[i].class_order = parseInt(data[i].class_order);
            data[i].sort_id = parseInt(data[i].sort_id);
            
            keyed_data[data[i].ref] = angular.copy(data[i]);
        }
        
        var t_buddies = [];
        angular.forEach(keyed_data, function(value){
            value.next = (value.next_ref !== null ? keyed_data[value.next_ref]: null);
            value.prev = (value.prev_ref !== null ? keyed_data[value.prev_ref]: null);
            
            if(value.prev === null){ t_buddies.push(value); }
        });
        
        t_buddies = $filter('orderBy')(t_buddies, ['-class_order', 'sort_id']);
        var rec_push = function(arr, el, lvl){
            el.t_level = lvl;
            arr.push(el);
            if(el.next !== null){
                rec_push(arr, el.next, lvl + 1);
            }
        };
        $scope.buddies = [];
        for(i = 0; i < t_buddies.length; ++i){
            rec_push($scope.buddies, t_buddies[i], 0);
        }
    });
    
    $scope.toggle_have = function(ref){
        UserData.set('have_buddy', $scope.have_buddies);
    };
    
    $scope.toggle_had = function(ref){
        UserData.set('had_buddy', $scope.have_buddies);
    };
    
    $scope.change_qty = function(ref){
        UserData.set('qty_buddy', $scope.qty_buddies);
    };
    
    $scope.change_want = function(ref){
        UserData.set('want_buddy', $scope.want_buddies);
    };
    
    $scope.change_evolve = function(ref){
        UserData.set('evolve_buddy', $scope.evolve_buddies);
    };
    
    $scope.filter_all_filters = function(buddy) {
        var filter_bof_bot = function(buddy) {
            if ($scope.filters.bof_bot === '') {
                return true;
            } else if($scope.filters.bof_bot == 'Rare') {
                return buddy.slot_kind == 'Rare' || buddy.slot_kind == '3';
            } else if($scope.filters.bof_bot == 'Normal'){
                return buddy.slot_kind == 'Normal' || buddy.slot_kind == '3';
            } else if($scope.filters.bof_bot == 'None'){
                return buddy.slot_kind == 'None';
            }
        };

        var filter_evolution = function(buddy){
            if($scope.filters.evolution == false){
                return true;
            } else {
                return buddy.next != null || buddy.prev != null;
            }
        }

        var filter_class = function(buddy) {
            if ($scope.filters.classes.length === 0 || $scope.filters.classes[0] === '') {
                return true;
            } else {
                return $scope.filters.classes.indexOf(buddy.rarity) != -1;
            }
        };

        var filter_have = function(buddy) {
            if (!$scope.filters.only_have) {
                return true;
            } else {
                return $scope.have_buddies[buddy.ref];
            }
        };
        
        var filter_had = function(buddy) {
            if (!$scope.filters.only_had) {
                return true;
            } else {
                return $scope.had_buddies[buddy.ref];
            }
        };
        
        var filter_not_had = function(buddy) {
            if (!$scope.filters.only_not_had) {
                return true;
            } else {
                return ! $scope.had_buddies[buddy.ref];
            }
        };
        
        var filter_want = function(buddy) {
            if (!$scope.filters.only_want) {
                return true;
            } else {
                return $scope.want_buddies[buddy.ref] >= 1;
            }
        };

        return filter_bof_bot(buddy) && filter_class(buddy) && filter_have(buddy) && filter_want(buddy) && filter_evolution(buddy) && filter_had(buddy) && filter_not_had(buddy);
    };
});
