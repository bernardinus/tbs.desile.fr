'use strict';

/**
 * @ngdoc function
 * @name tbsApp.controller:QuickStartCtrl
 * @description
 * # QuickStartCtrl
 * Controller of the tbsApp
 */
angular.module('tbsApp').controller('QuickStartCtrl', function($scope, RItem, RCharacter, UserData, DailyBonus, RollCounter, ItemCounter, Counter, Rebirth, BuddyEvolution) {
    $scope.have_character = UserData.get('have_character', {});
    $scope.job_level = UserData.get('job_level', {});
    $scope.boost = UserData.get('boost', {});
    $scope.have_items = UserData.get('have_items', {});

    $scope.daily_bonus = DailyBonus.currentBonus();

    var temp_classed_characters = {
        Z :  { name : 'Z',  count : 0, have : 0, sb : 0, ordre : 0 },
        SS : { name : 'SS', count : 0, have : 0, sb : 0, ordre : 1 },
        S :  { name : 'S',  count : 0, have : 0, sb : 0, ordre : 2 },
        A :  { name : 'A',  count : 0, have : 0, sb : 0, ordre : 3 },
        B :  { name : 'B',  count : 0, have : 0, sb : 0, ordre : 4 },
        C :  { name : 'C',  count : 0, have : 0, sb : 0, ordre : 5 },
        D :  { name : 'D',  count : 0, have : 0, sb : 0, ordre : 6 }
    };

    var temp_pacts = {
        'truth' : {
            Z :  { name : 'Z',  need : 0, ordre : 0, have : 0, sb : 0, exists : 0, part : 0.025 },
            SS : { name : 'SS', need : 0, ordre : 1, have : 0, sb : 0, exists : 0, part : 0.04875 },
            S :  { name : 'S',  need : 0, ordre : 2, have : 0, sb : 0, exists : 0, part : 0.04875 },
            A :  { name : 'A',  need : 0, ordre : 3, have : 0, sb : 0, exists : 0, part : 0.43875 },
            B :  { name : 'B',  need : 0, ordre : 4, have : 0, sb : 0, exists : 0, part : 0.43875 },
            C :  { name : 'C',  need : 0, ordre : 5 },
            D :  { name : 'D',  need : 0, ordre : 6 }
        },
        'fship' : {
            Z :  { name : 'Z',  need : 0, ordre : 0 },
            SS : { name : 'SS', need : 0, ordre : 1 },
            S :  { name : 'S',  need : 0, ordre : 2 },
            A :  { name : 'A',  need : 0, ordre : 3 },
            B :  { name : 'B',  need : 0, ordre : 4 },
            C :  { name : 'C',  need : 0, ordre : 5 },
            D :  { name : 'D',  need : 0, ordre : 6 }
        }
    };
    $scope.pact_total = {
        'truth' : 0,
        'fship' : 0
    };
    $scope.pact_overall_total = {
        'truth' : 0,
        'fship' : 0
    };

    /* Characters */
    $scope.characters = RCharacter.all(function(data) {
        $scope.have_character.count = function() {
            return data.reduce(function(p, c) {
                return ($scope.have_character[c.ref] ? p + 1 : p);
            }, 0);
        };
        var need_energy_fn = RollCounter.neededEnergy($scope.boost, $scope.have_character);
        var need_roll_fn   = RollCounter.neededRoll($scope.boost, $scope.have_character);
        var total_energy_fn = RollCounter.neededEnergy({}, {});
        var total_roll_fn   = RollCounter.neededRoll({}, {});

        for (var i = 0; i < data.length; ++i) {
            var char = data[i];
            /* count by class */
            temp_classed_characters[char.class_ref].count++;
            if ($scope.have_character[char.ref]) {
                temp_classed_characters[char.class_ref].have++;
                if ($scope.boost[char.ref] === 100) {
                    temp_classed_characters[char.class_ref].sb++;
                }
            }
            /* count possible roll */
            if (char.pact_of_truth === '1') {
                var needed = need_energy_fn(1, char.class_ref, char.ref);
                temp_pacts.truth[char.class_ref].need += needed;
                $scope.pact_total.truth += needed;
                /* dupes */
                temp_pacts.truth[char.class_ref].exists++;
                if ($scope.boost[char.ref] === 100 && $scope.have_character[char.ref]) {
                    temp_pacts.truth[char.class_ref].sb++;
                }
                if ($scope.have_character[char.ref]/* && $scope.boost[char.ref] != 100*/) {
                    temp_pacts.truth[char.class_ref].have++;
                }
                /* overall total for progress bar */
                $scope.pact_overall_total.truth += total_energy_fn(1, char.class_ref, char.ref);
            }
            if (char.pact_of_fellowship === '1') {
                needed = need_roll_fn(1, char.class_ref, char.ref);
                temp_pacts.fship[char.class_ref].need += needed;
                $scope.pact_total.fship += needed;
                /* overall total for progress bar */
               $scope.pact_overall_total.fship += total_roll_fn(1, char.class_ref, char.ref);
            }
        }

        $scope.classed_characters = [];
        $scope.classed_characters.push(temp_classed_characters.Z);
        $scope.classed_characters.push(temp_classed_characters.SS);
        $scope.classed_characters.push(temp_classed_characters.S);
        $scope.classed_characters.push(temp_classed_characters.A);
        $scope.classed_characters.push(temp_classed_characters.B);
        $scope.classed_characters.push(temp_classed_characters.C);
        $scope.classed_characters.push(temp_classed_characters.D);

        $scope.classed_truth = [];
        $scope.classed_truth.push(temp_pacts.truth.Z);
        $scope.classed_truth.push(temp_pacts.truth.SS);
        $scope.classed_truth.push(temp_pacts.truth.S);
        $scope.classed_truth.push(temp_pacts.truth.A);
        $scope.classed_truth.push(temp_pacts.truth.B);
        $scope.classed_truth.push(temp_pacts.truth.C);
        $scope.classed_truth.push(temp_pacts.truth.D);

        $scope.pact_truth_dupes = function() {
            var completed = 0;
            var t = angular.copy($scope.classed_truth);

            for (var i = 0; i < t.length; ++i) {
                if (t[i].exists == t[i].sb) {
                    if (angular.isDefined(t[i].part)) {
                        completed += t[i].part;
                    }
                }
            }
            if (completed != 0) {
                for (var i = 0; i < t.length; ++i) {
                    t[i].part /= (1 - completed);
                }
            }
            return t.reduce(function(p, c) {
                if (angular.isDefined(c.part) && !isNaN(c.part) && (c.exists - c.sb) != 0) {
                    var dupes = c.part * ((c.have - c.sb) / (c.exists - c.sb));
                    return p + dupes;
                } else {
                    return p;
                }
            }, 0);
        };

        $scope.classed_fship = [];
        $scope.classed_fship.push(temp_pacts.fship.Z);
        $scope.classed_fship.push(temp_pacts.fship.SS);
        $scope.classed_fship.push(temp_pacts.fship.S);
        $scope.classed_fship.push(temp_pacts.fship.A);
        $scope.classed_fship.push(temp_pacts.fship.B);
        $scope.classed_fship.push(temp_pacts.fship.C);
        $scope.classed_fship.push(temp_pacts.fship.D);
    });

    $scope.filter_need_zero = function(pact) {
        return pact.need != 0;
    }

    $scope.total_coins = RollCounter.totalCoins($scope.boost, $scope.have_character);
    $scope.total_energy = RollCounter.totalEnergy($scope.boost, $scope.have_character);

    $scope.nb_run_per_day = Counter.nb_run_per_day;

    /* Items */
    RItem.all(function(data) {
        $scope.items = angular.copy(data);
        ItemCounter.get().then(function(needs){
            $scope.item_needed = needs.item_needed;
            /* Rebirth */
            Rebirth.quick_stats().then(function(rebirths) {
                $scope.needed_rebirth = rebirths;
            });
            /* Buddy evolution */
            BuddyEvolution.quick_stats().then(function(evolutions){
                $scope.needed_evolution = evolutions;
            });
        });
        
    });
});
