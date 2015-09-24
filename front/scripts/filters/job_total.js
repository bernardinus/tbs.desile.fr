'use strict';

/**
 * @ngdoc filter
 * @name tbsApp.filter:jobTotal
 * @function
 * @description
 * # jobTotal
 * Filter in the tbsApp.
 */
angular.module('tbsApp')
  .filter('job_total', function () {
    return function(input){
        var sum = input.reduce(function(p, c){ return p + parseInt(c.max_job); }, 0);
        return sum;
    };
  });
