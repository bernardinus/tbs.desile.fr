'use strict';

/**
 * @ngdoc service
 * @name tbsApp.rollCounter
 * @description
 * # rollCounter
 * Service in the tbsApp.
 */
angular.module('tbsApp').service('RollCounter', function() {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var rollCounter = {};

    rollCounter.neededBoost = function(class_ref, char_ref, boost) {
        if (boost[char_ref] >= 100) {
            return 0;
        } else {
            return (100 - (boost[char_ref] ? boost[char_ref] : 0));
        }
    };

    rollCounter.neededRoll = function(boost, have_characters) {
        return function(is_pof, class_ref, char_ref) {
            if (class_ref == 'Z') {
                if (is_pof == 1) {
                    if (have_characters[char_ref]) {
                        return Math.ceil(rollCounter.neededBoost(class_ref, char_ref, boost) / 12);
                    } else {
                        return 1 + Math.ceil(100 / 12);
                    }
                } else {
                    return 0;
                }
            } else if (class_ref == 'SS') {
                if (is_pof == 1) {
                    if (have_characters[char_ref]) {
                        return Math.ceil(rollCounter.neededBoost(class_ref, char_ref, boost) / 10);
                    } else {
                        return 11;
                    }
                } else {
                    return 0;
                }
            } else {
                if (is_pof == 1) {
                    if (have_characters[char_ref]) {
                        return Math.ceil(rollCounter.neededBoost(class_ref, char_ref, boost) / 5);
                    } else {
                        return 21;
                    }
                } else {
                    return 0;
                }
            }
        };
    };

    rollCounter.neededEnergy = function(boost, have_character) {
        return function(is_pot, class_ref, char_ref) {
            if (class_ref == 'Z') {
                if (is_pot == 1) {
                    if (have_character[char_ref]) {
                        return Math.ceil(rollCounter.neededBoost(class_ref, char_ref, boost) / 12);
                    } else {
                        return 1 + Math.ceil(100 / 12);
                    }
                } else {
                    return 0;
                }
            } else if (class_ref == 'SS' || class_ref == 'S') {
                if (is_pot == 1) {
                    if (have_character[char_ref]) {
                        return Math.ceil(rollCounter.neededBoost(class_ref, char_ref, boost) / 10);
                    } else {
                        return 11;
                    }
                } else {
                    return 0;
                }
            } else {
                if (is_pot == 1) {
                    if (have_character[char_ref]) {
                        return Math.ceil(rollCounter.neededBoost(class_ref, char_ref, boost) / 5);
                    } else {
                        return 21;
                    }
                } else {
                    return 0;
                }
            }
        };
    };

    rollCounter.totalCoins = function(boost, have_character) {
        return function(characters) {
            var sum = 0;
            var fn = rollCounter.neededRoll(boost, have_character);
            for (var i = 0; i < characters.length; ++i) {
                var character = characters[i];
                var coins = fn(character.pact_of_fellowship, character.class_ref, character.ref) * 3000;
                sum += coins;
            }
            return sum;
        };
    };

    rollCounter.totalEnergy = function(boost, have_character) {
        return function(characters) {
            var sum = 0;
            var fn = rollCounter.neededEnergy(boost, have_character);
            for (var i = 0; i < characters.length; ++i) {
                var character = characters[i];
                var energy = fn(character.pact_of_truth, character.class_ref, character.ref) * 5;
                sum += energy;
            }
            return sum;
        };
    };

    return rollCounter;
});
