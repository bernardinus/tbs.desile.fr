'use strict';

/**
 * @ngdoc service
 * @name tbsApp.resJobAndSkills
 * @description
 * # resJobAndSkills
 * Factory in the tbsApp.
 */
angular.module('tbsApp').factory('RJobAndSkills', function($resource, ResourceBase) {
    // Service logic

    // Public API here
    return $resource(ResourceBase.href() + 'api/index.php/jobs_and_skills/:ref', {});
});
