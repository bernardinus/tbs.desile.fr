'use strict';

/**
 * @ngdoc service
 * @name tbsApp.counter
 * @description
 * # counter
 * Service in the tbsApp.
 */
angular.module('tbsApp')
  .service('Counter', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
      return {
        nb_run_per_day: function(cost){
            return 24 * 12 / cost;
        }
    };
  });
