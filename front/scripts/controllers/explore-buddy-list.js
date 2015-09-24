'use strict';

/**
 * @ngdoc function
 * @name tbsApp.controller:ExploreBuddyListCtrl
 * @description
 * # ExploreBuddyListCtrl
 * Controller of the tbsApp
 */
angular.module('tbsApp').controller('ExploreBuddyListCtrl', function ($scope, $filter, RBuddy) {
    $scope.characters = [];
    $scope.nb_col = 3;
    RBuddy.all(function(characters) {
        characters = $filter('orderBy')(characters, 'name', false);
        var chars = [];
        for (var i = 0; i < characters.length; ++i) {
            if(characters[i].name != 'text'){
                if (chars.length < $scope.nb_col) {
                    chars.push(characters[i]);
                }
                if (chars.length == $scope.nb_col) {
                    $scope.characters.push(chars);
                    chars = [];
                }
            }
        }
        if(chars.length > 0){
            $scope.characters.push(chars);
        }
    });
  });
