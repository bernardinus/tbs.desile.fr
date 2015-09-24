'use strict';

/**
 * @ngdoc function
 * @name tbsApp.controller:SkillBoostListCtrl
 * @description
 * # SkillBoostListCtrl
 * Controller of the tbsApp
 */
angular.module('tbsApp').controller('SkillBoostListCtrl', function($scope, $filter, RCharacter, UserData, InGame) {
    var have_character = UserData.get('have_character', {});
    var boost = UserData.get('boost', {});
    var cache_sb_up = UserData.get('cache_sb_up', {});
    $scope.characters = [];
    $scope.future_characters = [];
    $scope.nb_col = 4;
    RCharacter.all(function(characters) {
        characters = $filter('orderBy')(characters, ['-class_order', 'idx'], false);
        var row = [];
        var f_row = [];
        for (var i = 0; i < characters.length; ++i) {
            if (characters[i].pact_of_truth == 1){
                if(have_character[characters[i].ref] ) {
                    if(boost[characters[i].ref] < 100){
                        if(cache_sb_up[characters[i].ref]){
                            if(boost[characters[i].ref] == cache_sb_up[characters[i].ref].c_sb){
                                characters[i].sb_up = cache_sb_up[characters[i].ref].n_act / InGame.nb_activations_stage['1-5'];
                            } else {
                                characters[i].o_sb_up = cache_sb_up[characters[i].ref].n_act / InGame.nb_activations_stage['1-5'];
                            }
                            
                        }
                        if (row.length <= $scope.nb_col) { row.push(characters[i]); }
                        if (row.length == $scope.nb_col) { $scope.characters.push(row); row = []; }
                    }
                } else {
                    if (f_row.length <= $scope.nb_col) { f_row.push(characters[i]); }
                    if (f_row.length == $scope.nb_col) { $scope.future_characters.push(f_row); f_row = []; }
                }
            }
        }
        if(row.length != 0){ $scope.characters.push(row); }
        if(f_row.length != 0){ $scope.future_characters.push(f_row); }
    });
});
