'use strict';

/**
 * @ngdoc filter
 * @name tbsApp.filter:reverse
 * @function
 * @description
 * # reverse
 * Filter in the tbsApp.
 */
angular.module('tbsApp').filter('reverse', function () {
    return function (items) {
        if(items){
            return items.slice().reverse();
        } else {
            return items;
        }
    };
});
