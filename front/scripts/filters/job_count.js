'use strict';

/**
 * @ngdoc filter
 * @name tbsApp.filter:jobCount
 * @function
 * @description
 * # jobCount
 * Filter in the tbsApp.
 */
angular.module('tbsApp')
  .filter('job_count', function () {
    return function(input){
        var sum = input.reduce(function(p, c){ return p + (c.have()? c.job_level(): 0); }, 0);
        return sum;
    };
  });
