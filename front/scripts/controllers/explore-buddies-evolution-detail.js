'use strict';

/**
 * @ngdoc function
 * @name tbsApp.controller:ExploreBuddiesEvolutionDetailCtrl
 * @description
 * # ExploreBuddiesEvolutionDetailCtrl
 * Controller of the tbsApp
 */
angular.module('tbsApp')
  .controller('ExploreBuddiesEvolutionDetailCtrl', function ($scope, $routeParams, RBuddyEvolution) {
    RBuddyEvolution.get({ from: $routeParams.from, to: $routeParams.to }, function(data){
        $scope.details = data.details;
        $scope.items = data.items;
    });
    
});
