'use strict';

/**
 * @ngdoc filter
 * @name tbsApp.filter:positiveOrZero
 * @function
 * @description
 * # positiveOrZero
 * Filter in the tbsApp.
 */
angular.module('tbsApp').filter('positive_or_zero', function () {
    return function (input) {
        return input > 0 ? parseInt(input): 0;
    };
  });
