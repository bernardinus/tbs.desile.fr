'use strict';

/**
 * @ngdoc service
 * @name tbsApp.resBuddy
 * @description
 * # resBuddy
 * Service in the tbsApp.
 */
angular.module('tbsApp').factory('RBuddy', function($resource, ResourceBase) {
    return $resource(ResourceBase.href() + 'api/index.php/buddy/:ref', {}, {
        all : {
            url : ResourceBase.href() + 'api/index.php/buddies',
            method : 'GET',
            isArray : true,
            cache : true
        }
    });
});
