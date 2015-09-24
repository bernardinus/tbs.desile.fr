'use strict';

/**
 * @ngdoc service
 * @name tbsApp.resBuddyEvolution
 * @description
 * # resBuddyEvolution
 * Factory in the tbsApp.
 */
angular.module('tbsApp')
  .factory('RBuddyEvolution', function ($resource, ResourceBase) {
    // Service logic
    // ...

    // Public API here
    return $resource(ResourceBase.href() + 'api/index.php/buddy-evolution/:from/:to', {}, {
        all: {
            url: ResourceBase.href() + 'api/index.php/buddies-evolution',
            method: 'GET',
            isArray: true,
            cache: true
        },
        items: {
            url: ResourceBase.href() + 'api/index.php/buddies-evolution-items',
            method: 'GET',
            isArray: true,
            cache: true
        }
    });
  });
