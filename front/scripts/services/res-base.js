'use strict';

/**
 * @ngdoc service
 * @name tbsApp.resBase
 * @description
 * # resBase
 * Service in the tbsApp.
 */
angular.module('tbsApp').service('ResourceBase', function ($window) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var base = {};
    base.href = function(){
        if($window.location.origin.match(/tbs.desile.fr/)){
            return '';
        } else {
            return 'http://tbs.desile.fr/';
        }
    };
    return base;
});
