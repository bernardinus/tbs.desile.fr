'use strict';

/**
 * @ngdoc service
 * @name tbsApp.session
 * @description
 * # session
 * Service in the tbsApp.
 */
angular.module('tbsApp').service('Session', function() {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.create = function(username, token) {
        this.username = username;
        this.token = token;
    };
    this.destroy = function() {
        this.username = null;
        this.token = null;
    };
    return this;
});
