'use strict';

/**
 * @ngdoc service
 * @name tbsApp.authService
 * @description
 * # authService
 * Service in the tbsApp.
 */
angular.module('tbsApp')
  .service('AuthService', function ($http, Session, md5) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var authService = {};
    
    authService.login = function (credentials) {
        var cred = {
            username: credentials.username,
            password: md5.createHash(credentials.password)
        };
        return $http
            .post('api/index.php/login', cred)
            .then(function (res) {
                Session.create(res.data.username, res.data.token);
                return angular.fromJson(res.data.user_data);
            });
        };
    
    authService.isAuthenticated = function () {
        return !!Session.userId;
    };
    
    authService.isAuthorized = function (authorizedRoles) {
        if (!angular.isArray(authorizedRoles)) {
            authorizedRoles = [authorizedRoles];
        }
        return (authService.isAuthenticated() &&
            authorizedRoles.indexOf(Session.userRole) !== -1);
    };
    
    return authService;
});
