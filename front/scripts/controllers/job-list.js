'use strict';

/**
 * @ngdoc function
 * @name tbsApp.controller:JobListCtrl
 * @description
 * # JobListCtrl
 * Controller of the tbsApp
 */
angular.module('tbsApp').controller('JobListCtrl', function($scope, RJob, InGame, UserData) {
    var have_char = UserData.get('have_character', {});
    var job_levels = UserData.get('job_level', {});
    var job_level = {
        "1" : UserData.get('job1_level', {}),
        "2" : UserData.get('job2_level', {}),
        "3" : UserData.get('job3_level', {})
    };
    $scope.jobs = [];
    $scope.max_level = 90;
    
    $scope.cap_level = undefined;
    

    var calc_value = function(level, min, max, coeff) {
        var f = parseFloat(parseInt(level) - 1) / parseFloat(InGame.ChrJobParams_MaxLevel - 1);
        return Math.floor(parseFloat(min) + parseFloat(parseInt(max) - parseInt(min)) * Math.pow(f, parseFloat(coeff)));
    };

    RJob.all(function(jobs) {
        for (var i = 0; i < jobs.length; ++i) {
            var job = jobs[i];
            job.char_level = function(lvl){ return (angular.isNumber(lvl) ? lvl: (job_level[this.level][this.character_ref] || 1)); };

            job._hp    = function(lvl){ return calc_value(this.char_level(lvl), this.hp_min,   this.hp_max,   this.hp_coeff);   };
            job.m_hp   = function(lvl){ return calc_value($scope.max_level,     this.hp_min,   this.hp_max,   this.hp_coeff);   };
            job._atk   = function(lvl){ return calc_value(this.char_level(lvl), this.atk_min,  this.atk_max,  this.atk_coeff);  };
            job.m_atk  = function(lvl){ return calc_value($scope.max_level,     this.atk_min,  this.atk_max,  this.atk_coeff);  };
            job._def   = function(lvl){ return calc_value(this.char_level(lvl), this.def_min,  this.def_max,  this.def_coeff);  };
            job.m_def  = function(lvl){ return calc_value($scope.max_level,     this.def_min,  this.def_max,  this.def_coeff);  };
            job._matk  = function(lvl){ return calc_value(this.char_level(lvl), this.matk_min, this.matk_max, this.matk_coeff); };
            job.m_matk = function(lvl){ return calc_value($scope.max_level,     this.matk_min, this.matk_max, this.matk_coeff); };
            job._mdef  = function(lvl){ return calc_value(this.char_level(lvl), this.mdef_min, this.mdef_max, this.mdef_coeff); };
            job.m_mdef = function(lvl){ return calc_value($scope.max_level,     this.mdef_min, this.mdef_max, this.mdef_coeff); };

            if (have_char[job.character_ref] && job.xp && ((job_levels[job.character_ref] && job_levels[job.character_ref] >= job.level) || job.level == 1 )) {
                job.have_char = true;
                job.have_job = true;
            } else {
                if (!have_char[job.character_ref]) {
                    job.have_char = false;
                    job.have_job = false;
                } else {
                    job.have_char = true;
                    job.have_job = false;
                }
            }
            $scope.jobs.push(job);
        }
        $scope.jobs_limit = $scope.jobs.length;
    });

    $scope.btn_class = function(p) {
        if ($scope.predicate == p) {
            return $scope.reverse ? 'btn-success' : 'btn-danger';
        }
    };

    $scope.toggle_have_char = function() {
        if ($scope.search.have_char == '') {
            $scope.search.have_job = '';
        }
    };

    $scope.order_opts = {
        pred : 'ref',
        desc : true
    };
    var old_predicate = null;
    
    $scope.sort_change = function(pred) {
        if (pred == old_predicate) {
            $scope.order_opts.desc = !$scope.order_opts.desc;
            return;
        } else {
            $scope.order_opts.pred = function(job) {
                return job[pred]();
            };
            $scope.order_opts.desc = false;
            old_predicate = pred;
        }
    };
});
