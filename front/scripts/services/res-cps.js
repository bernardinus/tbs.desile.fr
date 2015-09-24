'use strict';

/**
 * @ngdoc service
 * @name tbsApp.resCps
 * @description
 * # resCps
 * Factory in the tbsApp.
 */
angular.module('tbsApp').factory('RCps', function($resource, ResourceBase) {
    // Service logic
    // Public API here
    return $resource(ResourceBase.href() + 'api/index.php/cps', {}, {
        all: {
            method: 'GET',
            isArray: true,
            cache: true
        }
    });
});
