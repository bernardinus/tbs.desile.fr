'use strict';

/**
 * @ngdoc function
 * @name tbsApp.controller:ExploreBuddiesEvolutionListCtrl
 * @description
 * # ExploreBuddiesEvolutionListCtrl
 * Controller of the tbsApp
 */
angular.module('tbsApp')
  .controller('ExploreBuddiesEvolutionListCtrl', function ($scope, RBuddyEvolution) {
    RBuddyEvolution.all(function(data){
        $scope.evolutions = data;
    })
  });
