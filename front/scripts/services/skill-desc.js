'use strict';

/**
 * @ngdoc service
 * @name tbsApp.skillDesc
 * @description
 * # skillDesc
 * Service in the tbsApp.
 */
angular.module('tbsApp').service('SkillDesc', function() {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var skilldesc = {};

    skilldesc.range_desc = function(skill) {
        if (skill.range_range !== '') {
            return skill.range_range;
        } else {
            if (skill.range == 'Sandwich') {
                return 'Pincer';
            } else if (skill.emit_ratio == -1 && skill.range == 'Chain') {
                return 'Self';
            } else {
                return skill.range;
            }
        }
    };

    skilldesc.emit_desc = function(skill) {
        if (skill.emit_ratio == -1) {
            return 'Equip';
        } else {
            return skill.emit_ratio + '%';
        }
    };

    return skilldesc;
});
