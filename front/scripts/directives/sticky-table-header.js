'use strict';

/**
 * @ngdoc directive
 * @name tbsApp.directive:stickyTableHeader
 * @description
 * # stickyTableHeader
 */
angular.module('tbsApp').directive('stickyTableHeader', function($timeout) {
    return {
        link : function(scope, element, attrs) {
            $timeout(function() {
                jQuery(element).stickyTableHeaders({
                    fixedOffset : jQuery('.navbar').height()
                });
            }, 500);
        }
    }
});
