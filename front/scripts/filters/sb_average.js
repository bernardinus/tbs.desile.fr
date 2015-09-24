'use strict';

/**
 * @ngdoc filter
 * @name tbsApp.filter:sbAverage
 * @function
 * @description
 * # sbAverage
 * Filter in the tbsApp.
 */
angular.module('tbsApp')
  .filter('sb_average', function () {
    return function(input){
        var sum = input.reduce(function(p, c){ return p + (c.have()? c.boost(): 0); }, 0);
        var count = input.reduce(function(p, c){ return p + (c.have()? 1: 0); }, 0);
        return sum / count;
    };
  });
