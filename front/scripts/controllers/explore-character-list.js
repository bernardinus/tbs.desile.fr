'use strict';

/**
 * @ngdoc function
 * @name tbsApp.controller:ExploreCharacterListCtrl
 * @description
 * # ExploreCharacterListCtrl
 * Controller of the tbsApp
 */
angular.module('tbsApp').controller('ExploreCharacterListCtrl', function($scope, $filter, RCharacter) {
    $scope.characters = [];
    $scope.nb_col = 4;
    RCharacter.all(function(characters) {
        characters = $filter('orderBy')(characters, 'name', false);
        var chars = [];
        for (var i = 0; i < characters.length; ++i) {
            if (chars.length < $scope.nb_col) {
                chars.push(characters[i]);
            }
            if (chars.length == $scope.nb_col) {
                $scope.characters.push(chars);
                chars = [];
            }
        }
        if(chars.length > 0){
            $scope.characters.push(chars);
        }
    });
});
