'use strict';

/**
 * @ngdoc service
 * @name tbsApp.jobData
 * @description
 * # jobData
 * Service in the tbsApp.
 */
angular.module('tbsApp').service('JobData', function (InGame) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var o = {};
    o.calc_value = function(level, min, max, coeff) {
        var f = parseFloat(parseInt(level) - 1) / parseFloat(InGame.ChrJobParams_MaxLevel - 1);
        return Math.floor(parseFloat(min) + parseFloat(parseInt(max) - parseInt(min)) * Math.pow(f, parseFloat(coeff)));
    };

    return o;
});
