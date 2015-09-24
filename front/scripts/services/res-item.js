'use strict';

/**
 * @ngdoc service
 * @name tbsApp.resItem
 * @description
 * # resItem
 * Factory in the tbsApp.
 */
angular.module('tbsApp').factory('RItem', function ($resource, ResourceBase) {
    // Service logic

    // Public API here
    return $resource(ResourceBase.href() + 'api/index.php/items', {}, {
        all: {
            method: 'GET',
            isArray: true,
            cache: true
        }
    });
  });
