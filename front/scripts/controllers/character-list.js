'use strict';

/**
 * @ngdoc function
 * @name tbsApp.controller:CharacterListCtrl
 * @description
 * # CharacterListCtrl
 * Controller of the tbsApp
 */
angular.module('tbsApp').controller('CharacterListCtrl', function($scope, $routeParams, $modal, RCharacter, RStage, UserData, ClassRef, RollCounter, Counter) {
    $scope.max_level = 90;
    var adv_default = UserData.get('adv_default', false);
    var have_default = UserData.get('have_default', false);
    var default_increment = UserData.get('settings_increment', {
        'adv' : 1,
        'mon' : 5
    });
    $scope.have_character = UserData.get('have_character', {});
    $scope.boost = UserData.get('boost', {});
    $scope.job_level = UserData.get('job_level', {});
    $scope.job1_level = UserData.get('job1_level', {});
    $scope.job2_level = UserData.get('job2_level', {});
    $scope.job3_level = UserData.get('job3_level', {});
    $scope.coins_cc3 = parseInt(UserData.get('coins_cc3', 8000));
    $scope.settings = UserData.get('settings_char_list', {
        update_on : 'default'
    });
    if (isNaN($scope.coins_cc3)) {
        $scope.coins_cc3 = 8000;
    }

    /* filters init */
    var default_filters = {
        'classes' : [''],
        'element_ref' : '',
        'weapon_ref' : '',
        'adventurer' : '',
        'generation': '0',
        'only_have' : false,
        'only_droppable' : false,
        'pof_100' : false,
        'pot_100' : false,
        'not_100' : false 
    };
    $scope.filters = UserData.get('char_list_filters', default_filters);

    if (have_default) {
        $scope.filters.only_have = true;
    }

    if (adv_default) {
        $scope.filters.adventurer = '1';
    }

    $scope.characters = [];

    RCharacter.all(function(data) {
        for (var i = 0; i < data.length; ++i) {
            data[i].have = function(value) {
                if (angular.isDefined(value)) {
                    $scope.have_character[this.ref] = value;
                }
                return $scope.have_character[this.ref];
            };

            data[i].idx = parseInt(data[i].idx);
            data[i].id = parseInt(data[i].id);
            data[i].generation = parseInt(data[i].generation);

            data[i].boost = function(value) {
                if (angular.isDefined(value)) {
                    $scope.boost[this.ref] = value;
                }
                return $scope.boost[this.ref];
            };

            data[i].job_level = function(value) {
                if (angular.isDefined(value)) {
                    $scope.job_level[this.ref] = value;
                }
                return $scope.job_level[this.ref];
            };

            data[i].job1_level = function(value) {
                if (angular.isDefined(value)) {
                    $scope.job1_level[this.ref] = value;
                }
                return $scope.job1_level[this.ref];
            };

            data[i].job2_level = function(value) {
                if (angular.isDefined(value)) {
                    $scope.job2_level[this.ref] = value;
                }
                return $scope.job2_level[this.ref];
            };

            data[i].job3_level = function(value) {
                if (angular.isDefined(value)) {
                    $scope.job3_level[this.ref] = value;
                }
                return $scope.job3_level[this.ref];
            };

            data[i].needed_roll = function() {
                // needed_roll(character.pact_of_fellowship, character.class_ref, character.ref) * 3000
                return $scope.needed_roll(this.pact_of_fellowship, this.class_ref, this.ref) * 3000;
            };

            data[i].needed_energy = function() {
                // needed_energy(character.pact_of_truth, character.class_ref, character.ref) * 5
                return $scope.needed_energy(this.pact_of_truth, this.class_ref, this.ref) * 5
            };

            $scope.characters.push(data[i]);
        }

        $scope.have_character.job_total = function() {
            return data.reduce(function(p, c) {
                if ($scope.have_character[c.ref]) {
                    return p + parseInt(c.max_job);
                }
                return p;
            }, 0);
        };
    });

    $scope.job_change = function(ref) {
        if (isNaN($scope.job_level[ref]) || $scope.job_level[ref] == undefined) {
            $scope.job_level[ref] = 1;
        }
        if ($scope.job_level[ref] == 1 && !$scope.job2_level[ref]) {
            $scope.job1_level[ref] = 1;
            $scope.job_level_change(1, ref);
        }
        if ($scope.job_level[ref] == 2 && !$scope.job2_level[ref]) {
            $scope.job2_level[ref] = 1;
            $scope.job_level_change(2, ref);
        }
        if ($scope.job_level[ref] == 3 && !$scope.job3_level[ref]) {
            $scope.job3_level[ref] = 1;
            $scope.job_level_change(3, ref);
        }
        UserData.set('job_level', $scope.job_level);
    };

    $scope.job_level_change = function(level, ref) {
        var key = 'job' + level + '_level';
        if (isNaN($scope[key][ref]) || $scope[key][ref] == undefined) {
            $scope[key][ref] = 1;
        }
        UserData.set(key, $scope[key]);
    };

    $scope.boost_change = function(ref) {
        if (isNaN($scope.boost[ref]) || $scope.boost[ref] == undefined) {
            $scope.boost[ref] = 0;
        }
        UserData.set('boost', $scope.boost);
    };

    $scope.toggle = function(character_ref) {
        UserData.set('have_character', $scope.have_character);
        if ($scope.have_character[character_ref]) {
            if (!$scope.job_level[character_ref]) {
                $scope.job_level[character_ref] = 1;
                $scope.job_change(character_ref);
                if (!$scope.job1_level[character_ref]) {
                    $scope.job1_level[character_ref] = 1;
                }
            }
            if (!$scope.boost[character_ref]) {
                $scope.boost[character_ref] = 0;
                $scope.boost_change(character_ref);
            }
        }
    }

    $scope.char_drop = {};
    RStage.characters.all(function(data) {
        for (var i = 0; i < data.length; ++i) {
            if (!$scope.char_drop[data[i].character_ref]) {
                $scope.char_drop[data[i].character_ref] = [];
            }
            $scope.char_drop[data[i].character_ref].push({
                stage_ref : data[i].stage_ref,
                percent : data[i].percent
            });
        }
    });

    $scope.drop_from = function(char_ref) {
        $modal.open({
            templateUrl : 'views/character-drop.html',
            controller : 'CharacterDropCtrl',
            resolve : {
                drop_from : function() {
                    return $scope.char_drop[char_ref] || [];
                },
                char_ref : function() {
                    return char_ref;
                }
            }
        });
    };

    $scope.export_txt = function(){
        $modal.open({
            templateUrl: 'views/character-list-export-txt.html',
            controller: 'CharacterListExportTxtCtrl',
            resolve: {
                characters: function(){
                    return $scope.characters;
                }
            }
        });
    }

    $scope.total_coins    = RollCounter.totalCoins($scope.boost,   $scope.have_character);
    $scope.total_energy   = RollCounter.totalEnergy($scope.boost,  $scope.have_character);
    $scope.needed_roll    = RollCounter.neededRoll($scope.boost,   $scope.have_character);
    $scope.needed_energy  = RollCounter.neededEnergy($scope.boost, $scope.have_character);
    $scope.nb_run_per_day = Counter.nb_run_per_day;

    $scope.__total_coins = function() {
        var amount = $scope.total_coins($scope.characters);
        return amount;
    };

    $scope.__total_energy = function() {
        var amount = $scope.total_energy($scope.characters);
        return amount;
    };

    $scope.__total_energy_duration = function(){
        var length = $scope.__total_energy() / (5 / 8 + 2 / 7);
        var duration = moment.duration(length, 'days');
        var years  = duration.years();
        var months = duration.months();
        var days   = duration.days();
        return years + ' years ' + months + ' months and ' + days + ' days';
    };

    /* filters */
    $scope.filter_all_filters = function(char) {
        var filter_adventurer = function(char) {
            if ($scope.filters.adventurer == '') {
                return true;
            } else {
                return char.adventurer == $scope.filters.adventurer;
            }
        };

        var filter_class = function(char) {
            if ($scope.filters.classes.length == 0 || $scope.filters.classes[0] == '') {
                return true;
            } else {
                return $scope.filters.classes.indexOf(char.class_ref) != -1;
            }
        };

        var filter_element = function(char) {
            if ($scope.filters.element_ref == '') {
                return true;
            } else {
                return char.element1_ref == $scope.filters.element_ref || (char.element2_ref && char.element2_ref == $scope.filters.element_ref) || (char.element3_ref && char.element3_ref == $scope.filters.element_ref);
            }
        };

        var filter_weapon = function(char) {
            if ($scope.filters.weapon_ref == '') {
                return true;
            } else {
                return (char.weapon1_ref == $scope.filters.weapon_ref) || (char.weapon2_ref && char.weapon2_ref == $scope.filters.weapon_ref) || (char.weapon3_ref && char.weapon3_ref == $scope.filters.weapon_ref);
            }
        };

        var filter_have = function(char) {
            if (!$scope.filters.only_have) {
                return true;
            } else {
                return $scope.have_character[char.ref];
            }
        };

        var filter_pof_100 = function(char) {
            if (!$scope.filters.pof_100) {
                return true;
            }
            return char.pact_of_fellowship == '1';
        };
        var filter_pot_100 = function(char) {
            if (!$scope.filters.pot_100) {
                return true;
            }
            return char.pact_of_truth == '1';
        };

        var filter_not_100 = function(char) {
            if (!$scope.filters.not_100) {
                return true;
            }
            return $scope.boost[char.ref] != 100;
        };

        var filter_droppable = function(char) {
            if (!$scope.filters.only_droppable) {
                return true;
            }
            return $scope.char_drop[char.ref] && $scope.char_drop[char.ref].length > 0;
        };
        
        var filter_generation = function(char) {
            if ($scope.filters.generation == 0) {
                return true;
            }
            return $scope.filters.generation == char.generation;
        };

        return filter_adventurer(char) && filter_class(char) && 
            filter_element(char) && filter_weapon(char) && 
            filter_have(char) && filter_pof_100(char) && 
            filter_pot_100(char) && filter_not_100(char) && 
            filter_droppable(char) && filter_generation(char);
    };

    $scope.toggle_filter_pot_100 = function() {
        if ($scope.filters.pot_100 && $scope.filters.pof_100) {
            $scope.filters.pof_100 = false;
        }
    };

    $scope.toggle_filter_pof_100 = function() {
        if ($scope.filters.pot_100 && $scope.filters.pof_100) {
            $scope.filters.pot_100 = false;
        }
    };

    $scope.reset_filters = function() {
        $scope.filters = angular.copy(default_filters);
    }

    $scope.date_in_x_weeks = function(n_weeks) {
        var today = new Date();
        var interval = Math.ceil(7 * n_weeks);
        var day = today.getDate();
        today.setDate(day + interval);
        return today.getDate() + '/' + (parseInt(today.getMonth()) + 1) + '/' + today.getFullYear();
    };

    $scope.drop_from_pop = function(ref) {
        var data = [];
        for (var i = 0; i < $scope.char_drop[ref].length; ++i) {
            data.push($scope.char_drop[ref][i].stage_ref);
        }
        $scope.popover_ = data.join(', ');
    };

    $scope.screenshot = function(restriction) {
        var data = {};
        var keys = ['id', 'have_character', 'boost', 'job1_level', 'job2_level', 'job3_level', 'job_level', 'have_eidolon', 'eidolon_level', 'starting_date'];
        for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];
            data[key] = UserData.get(key);
        }
        data['filter'] = restriction;
        data = JSON.stringify(data);
        document.getElementById('user_data').value = data;
        document.getElementById('form_screenshot').submit();
    };

    $scope.get_increment = function(adv_0_1) {
        return default_increment[adv_0_1 == 1 ? 'adv' : 'mon'];
    };

    $scope.sort_opts = {
        'pred' : ['-class_order', 'idx'],
        'desc' : false
    }
    var old_pred = undefined;
    $scope.change_sort = function(pred) {
        if (pred == old_pred) {
            $scope.sort_opts.desc = !$scope.sort_opts.desc;
            return;
        } else {
            $scope.sort_opts.pred = function(char) {
                return char[pred]();
            };
            $scope.sort_opts.desc = false;
            old_pred = pred;
        }
    };
});
