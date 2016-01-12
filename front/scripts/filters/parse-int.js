'use strict';

/**
 * @ngdoc filter
 * @name tbsApp.filter:parseInt
 * @function
 * @description
 * # parseInt
 * Filter in the tbsApp.
 */
angular.module('tbsApp').filter('parseInt', function () {
    return function(input) {
        if(input !== undefined){
            return parseInt(input);
        }
    };
});
