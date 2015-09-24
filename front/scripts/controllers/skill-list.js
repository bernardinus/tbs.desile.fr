'use strict';

/**
 * @ngdoc function
 * @name tbsApp.controller:SkillListCtrl
 * @description
 * # SkillListCtrl
 * Controller of the tbsApp
 */
angular.module('tbsApp').controller('SkillListCtrl', function($scope, RSkill, UserData) {
    var have_char = UserData.get('have_character', {});
    var job_levels = UserData.get('job_level', {});
    var job_level = {
        "1" : UserData.get('job1_level', {}),
        "2" : UserData.get('job2_level', {}),
        "3" : UserData.get('job3_level', {})
    };

    $scope.keyed_skills = {};

    RSkill.all(function(skill_data) {
        var skill = null;
        for (var i = 0; i < skill_data.length; ++i) {
            skill = angular.copy(skill_data[i]);
            if (have_char[skill.character_ref] && job_levels[skill.character_ref] && job_levels[skill.character_ref] >= skill.job_level && job_level[skill.job_level][skill.character_ref] >= skill.level) {
                if (!$scope.keyed_skills[skill.character_ref]) {
                    $scope.keyed_skills[skill.character_ref] = {
                        character_ref : skill.character_ref,
                        character_name : skill.character_name,
                        job_skills : {
                            1 : [],
                            2 : [],
                            3 : []
                        },
                        job_defs : {
                            1 : null,
                            2 : null,
                            3 : null
                        }
                    }
                }
                $scope.keyed_skills[skill.character_ref].job_skills[skill.job_level].push(skill);
            }
        }
    });

    $scope.skillIsOverCap = function(skill) {
        if (angular.isUndefined($scope.f_level_cap) || $scope.f_level_cap == '' || $scope.f_level_cap == null) {
            return false;
        } else {
            return skill.level > $scope.f_level_cap;
        }
    }
});
