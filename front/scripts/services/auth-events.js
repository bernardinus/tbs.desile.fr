'use strict';

/**
 * @ngdoc service
 * @name tbsApp.authEvents
 * @description
 * # authEvents
 * Constant in the tbsApp.
 */
angular.module('tbsApp')
  .constant('AUTH_EVENTS', {
    loginSuccess:     'auth-login-success',
    loginFailed:      'auth-login-failed',
    logoutSuccess:    'auth-logout-success',
    sessionTimeout:   'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized:    'auth-not-authorized'
});
