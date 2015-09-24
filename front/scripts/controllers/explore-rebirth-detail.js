'use strict';

/**
 * @ngdoc function
 * @name tbsApp.controller:ExploreRebirthDetailCtrl
 * @description
 * # ExploreRebirthDetailCtrl
 * Controller of the tbsApp
 */
angular.module('tbsApp').controller('ExploreRebirthDetailCtrl', function ($scope, $routeParams, RRebirth) {
    $scope.rebirth = RRebirth.get({ src: $routeParams.src, dst: $routeParams.dst });
});
