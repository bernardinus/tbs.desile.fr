'use strict';

/**
 * @ngdoc filter
 * @name tbsApp.filter:average
 * @function
 * @description
 * # average
 * Filter in the tbsApp.
 */
angular.module('tbsApp')
  .filter('average', function () {
    return function (input) {
      if(input != undefined){
        var s = input.reduce(function(prev, curr){ return prev + curr; }, 0);
        return parseInt(s / input.length);
    }
    };
  });
