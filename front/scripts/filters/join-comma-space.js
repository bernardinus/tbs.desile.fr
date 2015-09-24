'use strict';

/**
 * @ngdoc filter
 * @name tbsApp.filter:joinCommaSpace
 * @function
 * @description
 * # joinCommaSpace
 * Filter in the tbsApp.
 */
angular.module('tbsApp').filter('join_comma_space', function () {
    return function (input) {
        if(input != undefined){
            return input.join(', ');
        }
    };
  });
