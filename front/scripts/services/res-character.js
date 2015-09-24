'use strict';

/**
 * @ngdoc service
 * @name tbsApp.resCharacter
 * @description
 * # resCharacter
 * Factory in the tbsApp.
 */
angular.module('tbsApp').factory('RCharacter', function($resource, ResourceBase) {
    // Service logic

    // Public API here
    return $resource(ResourceBase.href() + 'api/index.php/character/:ref', {}, {
        all: {
            url: ResourceBase.href() + 'api/index.php/characters',
            method: 'GET',
            isArray: true,
            cache: true
        }
    });
});
