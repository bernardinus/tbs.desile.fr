'use strict';

/**
 * @ngdoc function
 * @name tbsApp.controller:ExploreBuddyDetailCtrl
 * @description
 * # ExploreBuddyDetailCtrl
 * Controller of the tbsApp
 */
angular.module('tbsApp').controller('ExploreBuddyDetailCtrl', function ($scope, $routeParams, RBuddy) {
    $scope.ref = $routeParams.ref;
    RBuddy.get({ ref: $scope.ref }, function(data){
        $scope.details = data.details;
        $scope.future  = data.future;
        $scope.past    = data.past;
    });
});
