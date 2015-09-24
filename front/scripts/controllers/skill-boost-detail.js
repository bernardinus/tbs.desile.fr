'use strict';

/**
 * @ngdoc function
 * @name tbsApp.controller:SkillBoostDetailCtrl
 * @description
 * # SkillBoostDetailCtrl
 * Controller of the tbsApp
 */
angular.module('tbsApp')
  .controller('SkillBoostDetailCtrl', function ($scope, $routeParams, UserData, RJobAndSkills, SkillBoostOptimizer) {
    $scope.have_character = UserData.get('have_character', {});
    $scope.boost = UserData.get('boost', {});
    $scope.ref = $routeParams.ref;

    var char_have = $scope.have_character[$scope.ref] ? true: false;
    $scope.char_boost = char_have ? ($scope.boost[$scope.ref]? $scope.boost[$scope.ref]: 0): 0;
    var max_p_sup = { sum: 0 };
    $scope.best_base_job = null;
    
    RJobAndSkills.get({ ref: $scope.ref }, function(jobs){
        $scope.jobs = [];
        $scope.phases = [];
        for(var i = 0; i < jobs.jobs.length; ++i){
            var job = jobs.jobs[i];
            job.level = parseInt(job.level);
            job.master_at_level = parseInt(job.master_at_level);
            job.phases_rates = { 1: [], 2: [], 3: [] };
            for(var j = job.skills.length - 1; j >= 0 ; --j){
                if(job.skills[j].phase < 1 || job.skills[j].phase > 3){
                    job.skills.splice(j, 1);
                    continue;
                }
                job.skills[j].base_emit_ratio = parseInt(job.skills[j].emit_ratio);
                job.skills[j].emit_ratio = job.skills[j].base_emit_ratio + $scope.char_boost
                if(job.skills[j].emit_ratio > 100){ job.skills[j].emit_ratio = 100; }
                job.skills[j].phase = parseInt(job.skills[j].phase);

                // so it can display which phase can be activated
                if($scope.phases.indexOf(job.skills[j].phase) == -1){ $scope.phases.push(job.skills[j].phase); }
            }
            job.p_skill_up = SkillBoostOptimizer.p_skill_up(job.skills);
            job.avg_activation_rate = SkillBoostOptimizer.avg_activation_rate(job.skills);
            if(job.p_skill_up.sum > max_p_sup.sum){
                max_p_sup = job.p_skill_up;
                $scope.best_base_job = job;
            }
            if(job.p_skill_up.sum == max_p_sup.sum){
                if(job.skills.length > $scope.best_base_job.skills.length){
                    $scope.best_base_job = job;
                } else if(job.skills.length == $scope.best_base_job.skills.length){
                    if(job.avg_activation_rate < $scope.best_base_job.avg_activation_rate){
                       $scope.best_base_job = job;
                   }
                }
            }
            $scope.jobs.push(job);
        }
        $scope.remaining_skills = [];
        /* If the character is a recode, you can add skills from the recoded character */
        if(jobs.recode == true){
            for(var i = 0; i < jobs.extra_skills.length; ++i){
                if(jobs.extra_skills[i].phase < 1 || jobs.extra_skills[i].phase > 3){
                    jobs.extra_skills.splice(i, 1);
                    continue;
                }
                jobs.extra_skills[i].base_emit_ratio = parseInt(jobs.extra_skills[i].emit_ratio);
                jobs.extra_skills[i].emit_ratio = jobs.extra_skills[i].base_emit_ratio + $scope.char_boost
                if(jobs.extra_skills[i].emit_ratio > 100){ jobs.extra_skills[i].emit_ratio = 100; }
                jobs.extra_skills[i].phase = parseInt(jobs.extra_skills[i].phase);
                jobs.extra_skills[i].job = jobs.extra_jobs[jobs.extra_skills[i].job_ref];
                $scope.remaining_skills.push(jobs.extra_skills[i]);
                
                // so it can display which phase can be activated
                if($scope.phases.indexOf(jobs.extra_skills[i].phase) == -1){ $scope.phases.push(jobs.extra_skills[i].phase); }
            }
        }
        
        for(var i = 0; i < $scope.jobs.length; ++i){
            if($scope.jobs[i] != $scope.best_base_job){
                for(var j = $scope.jobs[i].skills.length - 1; j >= 0 ; --j){
                    var skill = angular.copy($scope.jobs[i].skills[j]);
                    skill.job = $scope.jobs[i];
                    $scope.remaining_skills.push(skill);
                }
            }
        }
        
        $scope.suggested_skills = [];
        if($scope.remaining_skills.length <= 4){
            $scope.possible_combination = 1;
            $scope.suggested_skills = $scope.remaining_skills;
            var skills = $scope.suggested_skills.concat($scope.best_base_job.skills);
            $scope.suggested_p_skill_up = SkillBoostOptimizer.p_skill_up(skills);
        } else {
            // construction des jobs virtuels à partir des restants
            $scope.possible_combination = SkillBoostOptimizer.binomial_coeff($scope.remaining_skills.length, 4);
            $scope.subsets = SkillBoostOptimizer.combine($scope.remaining_skills, 4, 4);
            $scope.suggested_p_skill_up = { sum: 0 };
            $scope.best_subset = null;
            for(var i = 0; i < $scope.subsets.length; ++i){
                var psup = SkillBoostOptimizer.p_skill_up($scope.subsets[i]);
                if(psup.sum >= $scope.suggested_p_skill_up.sum){
                    $scope.suggested_p_skill_up = psup;
                    $scope.suggested_skills = $scope.subsets[i];
                }
            }
        }
        
        // Stages count
        var nb_activations_stage = {
            '1-4': 5,
            '1-5': 7
        };
        // chance for 2 skill boost in 1 run
        $scope.binomial_dist_1 = {
            '1-4': SkillBoostOptimizer.binomial_distribution(nb_activations_stage['1-4'], 1, $scope.suggested_p_skill_up.sum),
            '1-5': SkillBoostOptimizer.binomial_distribution(nb_activations_stage['1-5'], 1, $scope.suggested_p_skill_up.sum)
        };
        $scope.binomial_dist_2 = {
            '1-4': SkillBoostOptimizer.binomial_distribution(nb_activations_stage['1-4'], 2, $scope.suggested_p_skill_up.sum),
            '1-5': SkillBoostOptimizer.binomial_distribution(nb_activations_stage['1-5'], 2, $scope.suggested_p_skill_up.sum)
        };
        $scope.mean_binomial = {
            '1-4': 0.1 * $scope.binomial_dist_1['1-4'] + 0.2 * $scope.binomial_dist_2['1-4'],
            '1-5': 0.1 * $scope.binomial_dist_1['1-5'] + 0.2 * $scope.binomial_dist_2['1-5']
        };
        $scope.binomial_dist = {
            '1-4': $scope.binomial_dist_1['1-4'] + $scope.binomial_dist_2['1-4'],
            '1-5': $scope.binomial_dist_1['1-5'] + $scope.binomial_dist_2['1-5']
        };
        $scope.n_success = {
            '1-4': (100 - $scope.char_boost) / $scope.mean_binomial['1-4'],
            '1-5': (100 - $scope.char_boost) / $scope.mean_binomial['1-5']
        };
        $scope.n_activations = (100 - $scope.char_boost) / 0.1 / $scope.suggested_p_skill_up.sum;

        // cache 
        var cache_sb_up = UserData.get('cache_sb_up', {});
        if(angular.isUndefined(cache_sb_up[$scope.ref])){
            cache_sb_up[$scope.ref] = {
                c_sb: $scope.boost[$scope.ref] ? $scope.boost[$scope.ref]: 0,
                n_act: parseInt($scope.n_activations)
            }
            UserData.set('cache_sb_up', cache_sb_up);
        } else {
            if(cache_sb_up[$scope.ref].c_sb != $scope.boost[$scope.ref]){
                cache_sb_up[$scope.ref].c_sb = $scope.boost[$scope.ref];
                cache_sb_up[$scope.ref].n_act = parseInt($scope.n_activations);
                UserData.set('cache_sb_up', cache_sb_up);
            }
        }
    });
  });
