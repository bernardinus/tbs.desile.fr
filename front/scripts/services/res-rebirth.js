'use strict';

/**
 * @ngdoc service
 * @name tbsApp.resRebirth
 * @description
 * # resRebirth
 * Factory in the tbsApp.
 */
angular.module('tbsApp').factory('RRebirth', function($resource, ResourceBase) {
    // Service logic
    return $resource(ResourceBase.href() + 'api/index.php/rebirth/:src/:dst', {}, {
        all: {
            url: ResourceBase.href() + 'api/index.php/rebirth',
            method: 'GET',
            isArray: true,
            cache: true
        }
    });
});
