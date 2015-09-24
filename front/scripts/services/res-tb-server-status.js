'use strict';

/**
 * @ngdoc service
 * @name tbsApp.resTbServerStatus
 * @description
 * # resTbServerStatus
 * Factory in the tbsApp.
 */
angular.module('tbsApp').factory('RTBServerStatus', function($resource, ResourceBase) {
    // Public API here
    return $resource(ResourceBase.href() + 'api/index.php/get_server_status', {});
});
