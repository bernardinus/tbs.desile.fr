'use strict';

/**
 * @ngdoc service
 * @name tbsApp.dailyQuest
 * @description
 * # dailyQuest
 * Service in the tbsApp.
 */
angular.module('tbsApp').service('DailyQuest', function() {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var dq = {};

    var quests = {
         0 : 'Particle Hoarder Horde?',
         1 : '-',
         2 : 'Metal Runner Rampage',
         3 : 'Puppet Pandemonium',
         4 : 'Tropical Haze',
         5 : 'Crystal Roundelay',
         6 : '-',
         7 : 'Rarity Rumble',
         8 : 'Sweet Temptation',
         9 : 'Metal Runner Rampage',
        10 : 'Particle Hoarder Horde?',
        11 : '-',
        12 : 'Puppet Pandemonium',
        13 : 'Crystal Roundelay',
        14 : '-',
        15 : 'Metal Runner Rampage',
        16 : '-',
        17 : 'Rarity Rumble',
        18 : 'Tropical Haze',
        19 : 'Particle Hoarder Horde?',
        20 : '-',
        21 : 'Metal Runner Rampage',
        22 : 'Sweet Temptation',
        23 : 'Rarity Rumble',
        24 : 'Puppet Pandemonium',
        25 : '-',
        26 : 'Metal Runner Rampage',
        27 : '-',
        28 : 'Crystal Roundelay',
        29 : 'Hedgehog Hullaballo'
    };

    dq.forDate = function(date) {
        var reference = moment('2015-04-30');
        var diff = parseInt(moment.duration(date.diff(reference)).as('days')) % 30;
        return quests[diff];
    }

    return dq;
});
