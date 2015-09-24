'use strict';

/**
 * @ngdoc function
 * @name tbsApp.controller:ExploreCharacterDetailCtrl
 * @description
 * # ExploreCharacterDetailCtrl
 * Controller of the tbsApp
 */
angular.module('tbsApp').controller('ExploreCharacterDetailCtrl', function ($scope, $routeParams, RCharacter, SkillDesc, JobData, InGame) {
    $scope.ref = $routeParams.ref;
    $scope.details = RCharacter.get({ ref: $scope.ref }, function(){
        for(var i = 0; i < $scope.details.jobs.length; ++i){
            var job = $scope.details.jobs[i];
            // Profile
            var sentences = $scope.details.jobs[i].profile.split('\n');
            $scope.details.jobs[i].profile = [];
            for(var j = 0; j < sentences.length; ++j){
                if(sentences[j] != ''){
                    $scope.details.jobs[i].profile.push(sentences[j].replace('--', ' — '));
                }
            }
            
            // Job stats
            var job_stats = [];
            var levels = [35, 65, 90];
            for(var l = 0; l < levels.length; ++l){
                var stat = {
                    level: levels[l],
                    hp: JobData.calc_value(levels[l], job.hp_min, job.hp_max, job.hp_coeff),
                    atk: JobData.calc_value(levels[l], job.atk_min, job.atk_max, job.atk_coeff),
                    matk: JobData.calc_value(levels[l], job.matk_min, job.matk_max, job.matk_coeff),
                    def: JobData.calc_value(levels[l], job.def_min, job.def_max, job.def_coeff),
                    mdef: JobData.calc_value(levels[l], job.mdef_min, job.mdef_max, job.mdef_coeff),
                    xp: Math.floor(parseFloat(job.xp_max) * Math.pow(parseFloat(levels[l] - 1) / parseFloat(InGame.ChrJobParams_MaxLevel - 1), parseFloat(job.xp)))
                };
                job_stats.push(stat);
            }
            $scope.details.jobs[i].stats = job_stats;
        }
        
        for(var s = 0; s < $scope.details.skills.length; ++s){
            if($scope.details.skills[s].better_desc.match(/^\[official\]/g)){
                delete $scope.details.skills[s].better_desc;
            }
        }
    });

    $scope.range_string = function(skill){
        return SkillDesc.range_desc(skill);
    };

    $scope.emit_str = function(skill){
        return SkillDesc.emit_desc(skill);
    };
  });
