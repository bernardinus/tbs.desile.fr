'use strict';

/**
 * @ngdoc service
 * @name tbsApp.inGame
 * @description
 * # inGame
 * Constant in the tbsApp.
 */
angular.module('tbsApp').constant('InGame', {
    nb_activations_stage: {
        '1-4': 5,
        '1-5': 7
    },
    ChrJobParams_MaxLevel: 99,
    /* 2 characters: 70% / 30%                       of total exp (instead of 50% each)
     * 3 characters: 60% / 30% / 10%                 of total exp (instead of 33.33% each)
     * 4 characters: 50% / 30% / 15% / 5%            of total exp (instead of 25% each)
     * 5 characters: 45% / 25% / 15% / 10% / 5%      of total exp (instead of 20% each)
     * 6 characters: 40% / 25% / 15% / 10% / 5% / 5% of total exp (instead of 16.66% each)
     */
    xp_distribution: {
        2: 0.7,
        3: 0.9,
        4: 0.95,
        5: 0.95,
        6: 0.95
    },
    LAST_CHAPTER: 34
});
