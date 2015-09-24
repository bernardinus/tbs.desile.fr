'use strict';

/**
 * @ngdoc function
 * @name tbsApp.controller:ExploreListCtrl
 * @description
 * # ExploreListCtrl
 * Controller of the tbsApp
 */
angular.module('tbsApp')
  .controller('ExploreListCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
