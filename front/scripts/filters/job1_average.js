'use strict';

/**
 * @ngdoc filter
 * @name tbsApp.filter:job1Average
 * @function
 * @description
 * # job1Average
 * Filter in the tbsApp.
 */
angular.module('tbsApp')
  .filter('job1_average', function () {
    return function(input){
        var sum = input.reduce(function(p, c){ return p + (c.have()? c.job1_level(): 0); }, 0);
        var count = input.reduce(function(p, c){ return p + (c.have()? 1: 0); }, 0);
        return sum / count;
    };
  });
