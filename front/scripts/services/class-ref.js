'use strict';

/**
 * @ngdoc service
 * @name tbsApp.classRef
 * @description
 * # classRef
 * Service in the tbsApp.
 */
angular.module('tbsApp').service('ClassRef', function() {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var classRef = {};
    classRef.previousClass = function(class_ref) {
        switch(class_ref) {
            case 'Z':
                return false;
            case 'SS':
                return 'Z';
            case 'S':
                return 'SS';
            case 'A':
                return 'S';
            case 'B':
                return 'A';
            case 'C':
                return 'B';
            case 'D':
                return 'C';
        }
    };

    classRef.nextClass = function(class_ref) {
        switch(class_ref) {
            case 'Z':
                return 'SS';
            case 'SS':
                return 'S';
            case 'S':
                return 'A';
            case 'A':
                return 'B';
            case 'B':
                return 'C';
            case 'C':
                return 'D';
            case 'D':
                return false;
        }
    };

    return classRef;
});
