'use strict';

/**
 * @ngdoc filter
 * @name tbsApp.filter:job3Average
 * @function
 * @description
 * # job3Average
 * Filter in the tbsApp.
 */
angular.module('tbsApp')
  .filter('job3_average', function () {
    return function(input){
        var sum = input.reduce(function(p, c){ return p + (c.have() && c.job_level() == 3? c.job3_level(): 0); }, 0);
        var count = input.reduce(function(p, c){ return p + (c.have() && c.job_level() == 3? 1 : 0); }, 0);
        return sum / count;
    };
  });
