'use strict';

/**
 * @ngdoc service
 * @name tbsApp.resJob
 * @description
 * # resJob
 * Factory in the tbsApp.
 */
angular.module('tbsApp').factory('RJob', function($resource, ResourceBase) {
    // Service logic
    var rjob = $resource(ResourceBase.href() + 'api/index.php/job', {}, {
        all: {
            url: 'api/index.php/jobs',
            method: 'GET',
            isArray: true,
            cache: true
        }
    });
    angular.extend(rjob, {
        items: $resource(ResourceBase.href() + 'api/index.php/job_item', {}, {
            all: {
                method: 'GET',
                isArray: true,
                cache: true
            }
        })
    });
    // Public API here
    return rjob;
});
