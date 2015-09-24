'use strict';

/**
 * @ngdoc service
 * @name tbsApp.userRoles
 * @description
 * # userRoles
 * Constant in the tbsApp.
 */
angular.module('tbsApp').constant('USER_ROLES', {
    all : '*',
    admin : 'admin',
    editor : 'editor',
    guest : 'guest'
});
