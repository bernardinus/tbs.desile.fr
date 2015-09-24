'use strict';

/**
 * @ngdoc filter
 * @name tbsApp.filter:ceil
 * @function
 * @description
 * # ceil
 * Filter in the tbsApp.
 */
angular.module('tbsApp').filter('ceil', function () {
    return function (input) {
      return Math.ceil(input);
    };
  });
