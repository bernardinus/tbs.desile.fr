'use strict';

/**
 * @ngdoc function
 * @name tbsApp.controller:XpListCtrl
 * @description
 * # XpListCtrl
 * Controller of the tbsApp
 */
angular.module('tbsApp').controller('XpListCtrl', function($scope, $routeParams, $location, RJob, RStage, UserData, XpAverage, MetalZone, $filter, InGame) {
    var have_char = UserData.get('have_character', {});
    var job_levels = UserData.get('job_level', {});
    var adv_default = localStorage['adv_default'] ? angular.fromJson(localStorage['adv_default']) : false;
    $scope.settings = UserData.get('settings_xp_list', {
        update_on : 'default'
    });
    $scope.job_level = {
        1 : UserData.get('job1_level', {}),
        2 : UserData.get('job2_level', {}),
        3 : UserData.get('job3_level', {})
    };
    $scope.exclude_from_levelling = UserData.get('exclude_from_levelling', []);
    if($scope.exclude_from_levelling.length == 1 && $scope.exclude_from_levelling[0] == ''){
        $scope.exclude_from_levelling = [];
    }
    $scope.level_ref = $routeParams.level_ref;

    $scope.limit_levels = $routeParams.level_ref;
    $scope.change_limit_levels = function(limit_levels) {
        if (limit_levels == '') {
            $location.path('/xp');
        } else {
            $location.path('/xp/' + limit_levels);
        }
    };

    $scope.level60_opts = {
        level : null,
        level_ref : '20-1',
        team_size : 6,
        cap_job_1 : 65,
        cap_job_2 : 65,
        cap_job_3 : 90,
        seasoned_pro: false
    };

    $scope.mz_opts = {
        team_size : 6,
        use_op_carrier: true
    };
    var user_stage_exp = UserData.get('user_stage_exp', {});
    
    RStage.all(function(stages) {
        $scope.stages = stages;
        for (var i = 0; i < $scope.stages.length; ++i) {
            if ($scope.stages[i].ref == $scope.level60_opts.level_ref) {
                $scope.level60_opts.level = $scope.stages[i];
            }
            if(angular.isDefined(user_stage_exp[$scope.stages[i].ref])){
                $scope.stages[i].exp = $filter('average')(user_stage_exp[$scope.stages[i].ref]);
            }
        }
    });

    if (adv_default) {
        $scope.f_adventurer = 1;
    } else {
        $scope.f_adventurer = '';
    }

    $scope.jobs = [];
    $scope.mz = {
        "1" : [],
        "2" : [],
        "3" : [],
        "4" : [],
        "5" : [],
        "6" : []
    };
    $scope.zones = ['6', '5', '4', '3', '2', '1'];
    $scope.zone_level = [70, 60, 50, 40, 30, 20];
    $scope.max_level = 90;
    var ChrJobParams_MaxLevel = 99;

    RJob.all(function(jobs) {
        for (var i = 0; i < jobs.length; ++i) {
            jobs[i].level = parseInt(jobs[i].level);
            jobs[i].char_level = function() {
                return $scope.job_level[this.level][this.character_ref] || 1;
            };
            jobs[i]._exp = function(level) {
                var f = parseFloat(level - 1) / parseFloat(ChrJobParams_MaxLevel - 1);
                return Math.floor(parseFloat(this.xp_max) * Math.pow(f, parseFloat(this.xp)));
            };
            jobs[i].start_exp = function(zone) {
                return this._exp(this.level_start(zone));
            };
            jobs[i].end_exp = function(zone) {
                return this._exp(this.level_end(zone));
            };

            jobs[i].level_start = function(zone) {
                var floors = {
                    '1' : 0,
                    '2' : 20,
                    '3' : 30,
                    '4' : 40,
                    '5' : 50,
                    '6' : 60,
                    99 : 70
                };
                return floors[zone] >= this.char_level() ? floors[zone] : this.char_level();
            };
            jobs[i].level_end = function(zone) {
                var ceils = {
                    '1' : 20,
                    '2' : 30,
                    '3' : 40,
                    '4' : 50,
                    '5' : 60,
                    '6' : 70,
                    99 : 90
                };
                if (zone >= 90) {
                    if (this.adventurer == 1 && this.level == 1) {
                        return Math.min(ceils[zone], $scope.level60_opts.cap_job_1);
                    }
                    if (this.level == 2) {
                        return $scope.level60_opts.cap_job_2;
                    }
                    if (this.level == 3) {
                        return $scope.level60_opts.cap_job_3;
                    }
                } else {
                    if(this.adventurer == 1 && this.level == 1){
                        return Math.min(ceils[zone], $scope.level60_opts.cap_job_1);
                    }
                    if (this.level == 2) {
                        return Math.min(ceils[zone], $scope.level60_opts.cap_job_2);
                    }
                    if (this.level == 3) {
                        return Math.min(ceils[zone], $scope.level60_opts.cap_job_3);
                    }
                    return ceils[zone];
                }
            };

            jobs[i].need_next = function(zone) {
                return this.end_exp(zone) - this.start_exp(zone);
            };
            jobs[i].nb_run = function(zone, opts) {
                return Math.ceil(this.need_next(zone) / this.avg_xp(zone, opts));
            };
            jobs[i].avg_xp = function(zone, opts) {
                if (zone >= 90) {
                    var bonus = opts.seasoned_pro ? 1.15: 1;
                    return (opts.level.exp * bonus) / opts.team_size;
                } else {
                    if($scope.mz_opts.use_op_carrier){
                        return (XpAverage.average('mz' + zone) * InGame.xp_distribution[opts.team_size]) / (opts.team_size - 1);
                    } else {
                        return XpAverage.average('mz' + zone) / opts.team_size;
                    }
                }
            };

            jobs[i].mz = function() {
                if (this.char_level() <= 19) {
                    return 1;
                } else if (this.char_level() <= 29) {
                    return 2;
                } else if (this.char_level() <= 39) {
                    return 3;
                } else if (this.char_level() <= 49) {
                    return 4;
                } else if (this.char_level() <= 59) {
                    return 5;
                } else if (this.char_level() <= 69) {
                    return 6;
                } else {
                    return 99;
                }
            };

            if (have_char[jobs[i].character_ref] 
                && (jobs[i].level == 1 || job_levels[jobs[i].character_ref] >= jobs[i].level) 
                && $scope.exclude_from_levelling.indexOf(jobs[i].character_name) == -1)
            {
                $scope.jobs.push(jobs[i]);
            }
        }
    });

    $scope.job_level_change = function(level, ref) {
        var key = 'job' + level + '_level';
        UserData.set(key, $scope.job_level[level]);
    };

    $scope.filter_cap = function(opts) {
        return function(job) {
            if (job.level == 1 && job.adventurer == 1) {
                return job.char_level() < opts.cap_job_1;
            }
            if (job.level == 2) {
                return job.char_level() < opts.cap_job_2;
            }
            if (job.level == 3) {
                return job.char_level() < opts.cap_job_3;
            }
            return job.char_level() < $scope.max_level;
        };
    };

    $scope.filter_mz = function(zone) {
        return function(job) {
            return (job.mz() <= zone) && (job.level_end(zone) > job.level_start(zone));
        }
    };

    $scope.filter_adventurer = function(job, index) {
        if ($scope.f_adventurer == '') {
            return true;
        } else {
            return $scope.f_adventurer == job.adventurer;
        }
    };

    $scope.filter_class = function(job) {
        if ($scope.f_class.length == 0 || $scope.f_class[0] == '') {
            return true;
        } else {
            return $scope.f_class.indexOf(job.class_ref) != -1;
        }
    };

    $scope.order_need_next = function(zone) {
        return function(job) {
            return job.need_next(zone);
        }
    };

    $scope.class_xp_not_yet = function(mz, job) {
        return mz != job.mz();
    };
});
