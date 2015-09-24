'use strict';

/**
 * @ngdoc service
 * @name tbsApp.xp
 * @description
 * # xp
 * Service in the tbsApp.
 */
angular.module('tbsApp').service('XpAverage', function(UserData) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var xp = {};
    xp.average = function(ref) {
        var input = [1];
        var stage_exp;
        if (ref == '20-1') {
            stage_exp = UserData.get('stage_exp', {
                '20-1' : [220000]
            });
            if (!stage_exp[ref]) {
                stage_exp[ref] = [220000];
            }
            input = stage_exp[ref];
        } else if (ref == '23-4') {
            stage_exp = UserData.get('stage_exp', {
                '23-4' : [110000]
            });
            if (!stage_exp[ref]) {
                stage_exp[ref] = [110000];
            }
            input = stage_exp[ref];
        } else if (ref == '15-9') {
            stage_exp = UserData.get('stage_exp', {
                '15-9' : [50000]
            });
            if (!stage_exp[ref]) {
                stage_exp[ref] = [50000];
            }
            input = stage_exp[ref];
        } else {
            var mz_exp = UserData.get('mz_exp', {
                'mz1' : [100000],
                'mz2' : [100000],
                'mz3' : [200000],
                'mz4' : [200000],
                'mz5' : [300000],
                'mz6' : [200000],
            });
            switch(ref) {
                case 'mz1':
                    input = mz_exp.mz1 || [100000];
                    break;
                case 'mz2':
                    input = mz_exp.mz2 || [100000];
                    break;
                case 'mz3':
                    input = mz_exp.mz3 || [200000];
                    break;
                case 'mz4':
                    input = mz_exp.mz4 || [200000];
                    break;
                case 'mz5':
                    input = mz_exp.mz5 || [300000];
                    break;
                case 'mz6':
                    input = mz_exp.mz6 || [200000];
                    break;
            }
        }

        var sum = input.reduce(function(prev, curr) {
            return prev + curr;
        }, 0);
        return parseInt(sum / input.length);
    };

    return xp;
});
