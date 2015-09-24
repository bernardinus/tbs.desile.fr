'use strict';

/**
 * @ngdoc service
 * @name tbsApp.dailyBonus
 * @description
 * # dailyBonus
 * Service in the tbsApp.
 */
angular.module('tbsApp').service('DailyBonus', function() {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var dailyBonus = {};

    dailyBonus.referenceDate = function() {
        // 7 feb 2015
        return new Date(2015, 1, 7, 0, 0, 0, 0);
    };

    dailyBonus.currentDayNumber = function() {
        var today = new Date();
        var diff1 = today - this.referenceDate();
        //console.log('diff1', diff1);
        var diff = Math.floor(diff1 / 24 / 3600000);
        //console.log('diff', diff);
        return diff % 15;
    };

    dailyBonus.numberForDate = function(date) {
        var diff1 = date - this.referenceDate();
        //console.log('diff1', diff1);
        var diff = Math.floor(diff1 / 24 / 3600000);
        //console.log('diff', diff);
        return diff % 15;
    };

    dailyBonus.currentBonus = function() {
        var all = this.allBonuses();
        var index = this.currentDayNumber();
        //console.log('index', index);
        var bonus = all[index];
        bonus.label = function() {
            return this.chapters.length != 0 ? this.name + ' on chapters ' + this.chapters.join(', ') : this.name;
        };
        return bonus;
    };

    dailyBonus.bonusForDate = function(date) {
        var all = this.allBonuses();
        var index = this.numberForDate(date);
        var bonus = all[index];
        bonus.label = function() {
            return this.chapters.length != 0 ? this.name + ' on chapters ' + this.chapters.join(', ') : this.name;
        };
        return bonus;
    };

    dailyBonus.allBonuses = function() {
        var label = function() {
            return this.chapters.length != 0 ? this.num + ' - ' + this.name + ' (' + this.chapters + ')' : this.num + ' - ' + this.name;
        };
        return [{
            num : 1,
            name : "Items drop rate x 2",
            chapters : [4, 9, 14, 19, 24, 29, 34],
            label : label
        }, {
            num : 2,
            name : "Monsters drop rate x 2",
            chapters : [6, 11, 16, 21, 26, 31],
            label : label
        }, {
            num : 3,
            name : "nothing",
            chapters : [],
            label : label
        }, {
            num : 4,
            name : "Items drop rate x 2",
            chapters : [5, 10, 15, 20, 25, 30],
            label : label
        }, {
            num : 5,
            name : "Monsters drop rate x 2",
            chapters : [2, 7, 12, 17, 22, 27, 32],
            label : label
        }, {
            num : 6,
            name : "nothing",
            chapters : [],
            label : label
        }, {
            num : 7,
            name : "Items drop rate x 2",
            chapters : [6, 11, 16, 21, 26, 31],
            label : label
        }, {
            num : 8,
            name : "Monsters drop rate x 2",
            chapters : [3, 8, 13, 18, 23, 28],
            label : label
        }, {
            num : 9,
            name : "nothing",
            chapters : [],
            label : label
        }, {
            num : 10,
            name : "Items drop rate x 2",
            chapters : [2, 7, 12, 17, 22, 27, 32],
            label : label
        }, {
            num : 11,
            name : "Monsters drop rate x 2",
            chapters : [4, 9, 14, 19, 24, 29, 34],
            label : label
        }, {
            num : 12,
            name : "nothing",
            chapters : [],
            label : label
        }, {
            num : 13,
            name : "Items drop rate x 2",
            chapters : [3, 8, 13, 18, 23, 28],
            label : label
        }, {
            num : 14,
            name : "Monsters drop rate x 2",
            chapters : [5, 10, 15, 20, 25, 30],
            label : label
        }, {
            num : 15,
            name : "nothing",
            chapters : [],
            label : label
        }];
    }

    return dailyBonus;
});
