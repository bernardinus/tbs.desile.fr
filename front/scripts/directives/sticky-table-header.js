'use strict';

/**
 * @ngdoc directive
 * @name tbsApp.directive:stickyTableHeader
 * @description
 * # stickyTableHeader
 */
angular.module('tbsApp').directive('stickyTableHeader', function($timeout, deviceDetector) {
    return {
        link : function(scope, element) {
            $timeout(function() {
                if(deviceDetector.browser == 'firefox'){ return; }
                jQuery(element).stickyTableHeaders({
                    fixedOffset : jQuery('.navbar').height(),
                    cacheHeaderHeight: true
                });
            }, 500);
        }
    };
});
