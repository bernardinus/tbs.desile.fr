'use strict';

/**
 * @ngdoc service
 * @name tbsApp.resChapter
 * @description
 * # resChapter
 * Factory in the tbsApp.
 */
angular.module('tbsApp').factory('RChapter', function($resource, ResourceBase) {
    // Service logic

    // Public API here
    return $resource(ResourceBase.href() + 'api/index.php/chapter/:ref', {}, {
        all: {
            url: ResourceBase.href() + 'api/index.php/chapters',
            method: 'GET',
            isArray: true,
            cache: true
        }
    });
});
