'use strict';

/**
 * @ngdoc filter
 * @name tbsApp.filter:job2Average
 * @function
 * @description
 * # job2Average
 * Filter in the tbsApp.
 */
angular.module('tbsApp')
  .filter('job2_average', function () {
    return function(input){
        var sum = input.reduce(function(p, c){ return p + (c.have() && c.job_level() >= 2 ? c.job2_level(): 0); }, 0);
        var count = input.reduce(function(p, c){ return p + (c.have() && c.job_level() >= 2 ? 1: 0); }, 0);
        return sum / count;
    };
  });
