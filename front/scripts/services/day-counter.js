'use strict';

/**
 * @ngdoc service
 * @name tbsApp.dayCounter
 * @description
 * # dayCounter
 * Service in the tbsApp.
 */
angular.module('tbsApp').service('DayCounter', function() {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var dayCounter = {};

    dayCounter.currentDay = function(starting_day) {
        return this.dayNumber(starting_day, new Date());
        /*var now = new Date();
         var diff = Math.floor((now - starting_day) / 1000 / 3600 / 24);
         return diff;*/
    };

    dayCounter.dayNumber = function(start, current) {
        var diff = Math.floor((current - start) / 1000 / 3600 / 24);
        return diff;
    };

    return dayCounter;
});
