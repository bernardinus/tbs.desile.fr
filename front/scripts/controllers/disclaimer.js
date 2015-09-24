'use strict';

/**
 * @ngdoc function
 * @name tbsApp.controller:DisclaimerCtrl
 * @description
 * # DisclaimerCtrl
 * Controller of the tbsApp
 */
angular.module('tbsApp')
  .controller('DisclaimerCtrl', function ($scope) {
    localStorage['seen_disclaimer'] = true;
  });
