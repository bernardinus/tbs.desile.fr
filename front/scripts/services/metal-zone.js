'use strict';

/**
 * @ngdoc service
 * @name tbsApp.metalZone
 * @description
 * # metalZone
 * Service in the tbsApp.
 */
angular.module('tbsApp').service('MetalZone', function() {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var metalZone = {};

    metalZone.optimize_nb_run = function(runs, size) {
        // ordre décroissant
        var runs2 = runs.slice(0).sort(function(a, b) {
            return a - b;
        }).reverse();
        var eat = function(_runs, _size) {
            var first = _runs[0];
            _runs.shift();
            var cover = first * (_size - 1);
            var sum = 0;
            while ((sum + _runs[0]) <= cover) {
                sum += _runs[0];
                _runs.shift();
            }
            return [first, _runs];
        };
        var count = 0, r;
        do {
            r = eat(runs2, size);
            count += r[0];
        } while(r[1].length !== 0);
        //console.log(runs, '->', count);
        return count;
    };

    metalZone.reference_date = moment.tz('2014-05-01 00:00:00', 'Asia/Tokyo');
    metalZone.GetMetalTypeAtTime = function(day, hour, min, duration) {
        var infos = {
            remain: 60,
            type: 'None'
        };
        var numArray = [9, 17, 12, 7, 19, 8, 10, 22, 11, 17];
        day = day % 10;
        var num = 0 + day % 5;
        var remain = 60 - min;
        if (hour == numArray[day]) {
            infos.type = 'King';
            return infos;
        }
        for (var i = 0; i < 4; i++) {
            var num1 = num + i * 6;
            if (hour >= num1 && hour < num1 + duration) {
                remain = (num1 + duration - hour) * 60 - min;
                infos.remain = remain;
                infos.type = 'Normal';
                return infos;
            }
        }
        return infos;
    };

    

    return metalZone;
});
