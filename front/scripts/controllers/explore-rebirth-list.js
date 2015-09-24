'use strict';

/**
 * @ngdoc function
 * @name tbsApp.controller:ExploreRebirthListCtrl
 * @description
 * # ExploreRebirthListCtrl
 * Controller of the tbsApp
 */
angular.module('tbsApp').controller('ExploreRebirthListCtrl', function ($scope, RRebirth) {
    $scope.rebirths = RRebirth.all();
});
