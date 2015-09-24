'use strict';

/**
 * @ngdoc service
 * @name tbsApp.resSkill
 * @description
 * # resSkill
 * Factory in the tbsApp.
 */
angular.module('tbsApp').factory('RSkill', function($resource, ResourceBase) {
    // Service logic

    // Public API here
    return $resource(ResourceBase.href() + 'api/index.php/skill/:ref', {}, {
        all: {
            url: ResourceBase.href() + 'api/index.php/skills',
            method: 'GET',
            isArray: true,
            cache: true
        }
    });
});
