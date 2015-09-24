'use strict';

/**
 * @ngdoc filter
 * @name tbsApp.filter:aggMzRun
 * @function
 * @description
 * # aggMzRun
 * Filter in the tbsApp.
 */
angular.module('tbsApp').filter('agg_mz_run', function(MetalZone, XpAverage, InGame){
    return function(jobs, zone, opts){
        if(jobs.length > 0){
            var sum = jobs.reduce(function(p, c){ return p + c.need_next(zone); }, 0);
            if(opts.use_op_carrier){
                return Math.ceil(sum / (XpAverage.average('mz' + zone) * InGame.xp_distribution[opts.team_size]));
            } else {
                return Math.ceil(sum / XpAverage.average('mz' + zone));
            }
        } else {
            return 0;
        }
    };
});
