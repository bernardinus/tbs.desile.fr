'use strict';

/**
 * @ngdoc service
 * @name tbsApp.resEidolon
 * @description
 * # resEidolon
 * Factory in the tbsApp.
 */
angular.module('tbsApp')
  .factory('REidolon', function ($resource, ResourceBase) {
    // Service logic

    // Public API here
    return $resource(ResourceBase.href() + 'api/index.php/characters_in_class/:ref', { ref: 'eidolon' }, {
        all: {
            method: 'GET',
            isArray: true,
            cache: true
        }
    });
  });
