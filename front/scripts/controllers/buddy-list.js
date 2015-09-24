'use strict';

/**
 * @ngdoc function
 * @name tbsApp.controller:BuddyListCtrl
 * @description
 * # BuddyListCtrl
 * Controller of the tbsApp
 */
angular.module('tbsApp').controller('BuddyListCtrl', function ($scope, RBuddy, UserData) {
    $scope.have_buddies  = UserData.get('have_buddy', {});
    $scope.qty_buddies   = UserData.get('qty_buddy',  {});
    $scope.want_buddies  = UserData.get('want_buddy',  {});
    $scope.evolve_buddies  = UserData.get('evolve_buddy',  {});
    
    /* filters init */
    $scope.filters = {
        'classes' : [''],
        'bof_bot' : '',
        'only_have': false,
        'only_want': false
    };
    
    RBuddy.all(function(data){
        for(var i = 0; i < data.length; ++i){
            data[i].class_order = parseInt(data[i].class_order);
            data[i].sort_id = parseInt(data[i].sort_id);
        };
        $scope.buddies = data;
    });
    
    $scope.toggle_have = function(ref){
        UserData.set('have_buddy', $scope.have_buddies);
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
            if ($scope.filters.bof_bot == '') {
                return true;
            } else if($scope.filters.bof_bot == 'Rare') {
                return buddy.slot_kind == 'Rare' || buddy.slot_kind == '3';
            } else if($scope.filters.bof_bot == 'Normal'){
                return buddy.slot_kind == 'Normal' || buddy.slot_kind == '3';
            } else if($scope.filters.bof_bot == 'None'){
                return buddy.slot_kind == 'None';
            }
        };

        var filter_class = function(buddy) {
            if ($scope.filters.classes.length == 0 || $scope.filters.classes[0] == '') {
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
        
        var filter_want = function(buddy) {
            if (!$scope.filters.only_want) {
                return true;
            } else {
                return $scope.want_buddies[buddy.ref] >= 1;
            }
        };

        return filter_bof_bot(buddy) && filter_class(buddy) && filter_have(buddy) && filter_want(buddy);
    };
});
