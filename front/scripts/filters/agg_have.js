'use strict';

/**
 * @ngdoc filter
 * @name tbsApp.filter:aggHave
 * @function
 * @description
 * # aggHave
 * Filter in the tbsApp.
 */
angular.module('tbsApp')
  .filter('agg_have', function () {
    return function(input, arg){
    //if(input.length > 0){ console.log(input); }
    if(angular.isDefined(arg)){
        if(arg == -1){
        return input.length;
        }
        if(arg === true){
        return input.reduce(function(p, c){ return c.have() ? p + 1: p; }, 0);
        }
    }
    return input.length;
    };
  });
