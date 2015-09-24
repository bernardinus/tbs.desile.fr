'use strict';

/**
 * @ngdoc filter
 * @name tbsApp.filter:totalCoins
 * @function
 * @description
 * # totalCoins
 * Filter in the tbsApp.
 */
angular.module('tbsApp')
  .filter('total_coins', function () {
    return function(input){
        var sum = input.reduce(function(p, c){ return p + c.needed_roll(); }, 0);
        return sum;
    };
  });
