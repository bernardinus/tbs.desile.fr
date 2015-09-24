'use strict';

/**
 * @ngdoc function
 * @name tbsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the tbsApp
 */
angular.module('tbsApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
