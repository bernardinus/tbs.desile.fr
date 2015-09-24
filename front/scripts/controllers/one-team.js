'use strict';

/**
 * @ngdoc function
 * @name tbsApp.controller:OneTeamCtrl
 * @description
 * # OneTeamCtrl
 * Controller of the tbsApp
 */
angular.module('tbsApp').controller('OneTeamCtrl', function($scope, $routeParams, RJob, RCharacter, UserData, XpAverage, MetalZone, InGame) {
    $scope.max_level = 90;
    var have_char = UserData.get('have_character', {});
    $scope.job_levels = UserData.get('job_level', {});
    $scope.job_level = {
        "1" : UserData.get('job1_level', {}),
        "2" : UserData.get('job2_level', {}),
        "3" : UserData.get('job3_level', {})
    };
    $scope.mzs = [1, 2, 3, 4, 5, 6];
    $scope.slot = UserData.get('one_team_slot', {});
    $scope.keyed_chars = {};
    $scope.characters = [];
    $scope.jobs = [];
    $scope.all_jobs = [];
    $scope.debug = false;
    $scope.exclude_last = UserData.get('one_team_exclude_last', false);

    RCharacter.all(function(c_data) {
        for (var c = 0; c < c_data.length; ++c) {
            if (have_char[c_data[c].ref]) {
                $scope.characters.push(c_data[c]);
                $scope.keyed_chars[c_data[c].ref] = c_data[c];
            }
        }
    });

    $scope.count_opts = {
        team_size : 6
    };

    RJob.all(function(j_data) {
        for (var j = 0; j < j_data.length; ++j) {
            j_data[j].char_level = function() {
                return $scope.job_level[this.level][this.character_ref] || 1;
            };
            j_data[j].level_start = function(zone) {
                var floors = {
                    '1' : 0,
                    '2' : 20,
                    '3' : 30,
                    '4' : 40,
                    '5' : 50,
                    '6' : 60
                };
                if (floors[zone] >= this.char_level()) {
                    return floors[zone];
                } else {
                    return this.char_level();
                }
            };
            j_data[j].level_end = function(zone) {
                var ceils = {
                    '1' : 20,
                    '2' : 30,
                    '3' : 40,
                    '4' : 50,
                    '5' : 60,
                    '6' : 70
                };
                return ceils[zone];
            };
            j_data[j].start_exp = function(zone) {
                return this._exp(this.level_start(zone));
            };
            j_data[j].mz = function() {
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
                    return 'after';
                }
            };
            j_data[j]._exp = function(level) {
                var f = parseFloat(level - 1) / parseFloat(99 - 1);
                return Math.floor(parseFloat(this.xp_max) * Math.pow(f, parseFloat(this.xp)));
            };
            j_data[j].end_exp = function(zone) {
                return this._exp(this.level_end(zone));
            };
            j_data[j].need_next = function(zone) {
                return this.end_exp(zone) - this.start_exp(zone);
            };

            j_data[j].avg_xp = function(zone) {
                if($scope.exclude_last){
                    var count = $scope.slot_count();
                    return (XpAverage.average('mz' + zone) * InGame.xp_distribution[count]) / (count - 1);
                } else {
                    return XpAverage.average('mz' + zone) / count;
                }
                
            };
            j_data[j].nb_run = function(zone) {
                return Math.ceil(this.need_next(zone) / this.avg_xp(zone));
            };

            $scope.all_jobs.push(j_data[j]);
            if (have_char[j_data[j].character_ref] && in_slot(j_data[j].character_ref) && $scope.job_levels[j_data[j].character_ref] >= j_data[j].level) {
                $scope.jobs.push(j_data[j]);
            }
        }
    });

    $scope.filter_mz = function(zone) {
        return function(job) {
            return job.mz() <= zone;
        }
    }

    $scope.order_need_next = function(job) {
        return job.need_next();
    }

    $scope.order_mz = function(job) {
        if (job.char_level() <= 19) {
            return 1;
        } else if (job.char_level() <= 29) {
            return 2;
        } else if (job.char_level() <= 39) {
            return 3;
        } else if (job.char_level() <= 49) {
            return 4;
        } else if (job.char_level() <= 59) {
            return 5;
        } else if (job.char_level() <= 69) {
            return 6;
        } else {
            return 99;
        }
    };

    $scope.change_slot = function(n) {
        UserData.set('one_team_slot', $scope.slot);
        $scope.jobs = [];
        for (var i = 0; i < $scope.all_jobs.length; ++i) {
            if (have_char[$scope.all_jobs[i].character_ref] && in_slot($scope.all_jobs[i].character_ref) && $scope.job_levels[$scope.all_jobs[i].character_ref] >= $scope.all_jobs[i].level) {
                $scope.jobs.push($scope.all_jobs[i]);
            }
        }
    };

    $scope.change_job_level_slot = function(job_l, sl) {
        var char_ref = $scope.slot[sl];
        var key = 'job' + job_l + '_level';
        UserData.set(key, $scope.job_level[job_l]);
    };

    $scope.change_exclude = function() {
        UserData.set('one_team_exclude_last', $scope.exclude_last);
        if ($scope.exclude_last) {
            for (var i = $scope.jobs.length - 1; i > 0; --i) {
                if ($scope.jobs[i].character_ref == $scope.slot[6]) {
                    $scope.jobs.splice(i, 1);
                }
            }
        } else {
            for (var i = 0; i < $scope.all_jobs.length; ++i) {
                if ($scope.all_jobs[i].character_ref == $scope.slot[6] && have_char[$scope.all_jobs[i].character_ref] && in_slot($scope.all_jobs[i].character_ref) && $scope.job_levels[$scope.all_jobs[i].character_ref] >= $scope.all_jobs[i].level) {
                    $scope.jobs.push($scope.all_jobs[i]);
                }
            }
        }
    };

    $scope.slot_count = function() {
        var s = 0;
        if ($scope.slot['1']) {
            s++;
        }
        if ($scope.slot['2']) {
            s++;
        }
        if ($scope.slot['3']) {
            s++;
        }
        if ($scope.slot['4']) {
            s++;
        }
        if ($scope.slot['5']) {
            s++;
        }
        if ($scope.slot['6']) {
            s++;
        }
        return s;
    };

    var in_slot = function(ref) {
        return $scope.slot['1'] == ref || $scope.slot['2'] == ref || $scope.slot['3'] == ref || $scope.slot['4'] == ref || $scope.slot['5'] == ref || $scope.slot['6'] == ref;
    };
});
