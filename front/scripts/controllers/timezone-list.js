'use strict';

/**
 * @ngdoc function
 * @name tbsApp.controller:TimezoneListCtrl
 * @description
 * # TimezoneListCtrl
 * Controller of the tbsApp
 */
angular.module('tbsApp').controller('TimezoneListCtrl', function($scope, DailyBonus) {
    var now = new Date();
    $scope.offset = now.getTimezoneOffset() / 60 * -1;

    $scope.timezones = [];
    var ref_date = new Date();
    var localTime = ref_date.getTime();
    var localOffset = ref_date.getTimezoneOffset() * 60000;
    var utc = localTime + localOffset;

    var hourly_hz = function(hour) {
        switch(hour % 3) {
            case 0:
                return 'Puppet Show';
            case 1:
                return 'Pudding Time';
            case 2:
                return 'Tin Parade';
        }
    };

    for (var i = -12; i <= 14; ++i) {
        $scope.timezones.push({
            gmt : i,
            date : function() {
                var offset = this.gmt;
                var gmt_date = utc + (3600000 * offset);
                var date = new Date(gmt_date);
                return date;
            },
            hz : function() {
                //return this.date().getDay();
                switch(this.date().getDay()) {
                    case 0:
                        return 'Coin Creep';
                    case 1:
                        return hourly_hz(this.date().getHours());
                    case 2:
                        return 'Pudding Time'
                    case 3:
                        return 'Tin Parade';
                    case 4:
                        return 'Puppet Show';
                    case 5:
                        return hourly_hz(this.date().getHours());
                    case 6:
                        return 'Coin Creep';
                }
            },
            db : function() {
                return DailyBonus.bonusForDate(this.date());
            }
        });
    }

    $scope.isGMTOffset = function(tz) {
        return tz.gmt == $scope.offset;
    }

    $scope.gmt_name = function(gmt) {
        if (gmt == 0) {
            return "GMT";
        } else if (gmt < 0) {
            return "GMT" + gmt;
        } else {
            return 'GMT+' + gmt;
        }
    };
    
    $scope.is_item_bonus = function(label){
        return /Item/.test(label);
    };
    
    $scope.is_monster_bonus = function(label){
        return /Monster/.test(label);
    }
});
