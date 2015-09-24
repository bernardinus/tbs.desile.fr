'use strict';

/**
 * @ngdoc filter
 * @name tbsApp.filter:totalEnergy
 * @function
 * @description
 * # totalEnergy
 * Filter in the tbsApp.
 */
angular.module('tbsApp')
  .filter('total_energy', function () {
    return function(input){
        var sum = input.reduce(function(p, c){ return p + c.needed_energy(); }, 0);
        return sum;
    };
  });
