'use strict';

/**
 * @ngdoc filter
 * @name tbsApp.filter:aggMzRunAfter
 * @function
 * @description
 * # aggMzRunAfter
 * Filter in the tbsApp.
 */
angular.module('tbsApp')
  .filter('agg_mz_run_after', function(MetalZone){
    return function(jobs, zone){
        if(jobs.length > 0){
            var runs = [];
            for(var i = 0; i < jobs.length; ++i){
                runs.push(jobs[i].nb_run(zone));
            }
            return MetalZone.optimize_nb_run(runs, 6);
        } else {
            return 0;
        }
    };
});
