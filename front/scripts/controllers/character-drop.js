'use strict';

/**
 * @ngdoc function
 * @name tbsApp.controller:CharacterDropCtrl
 * @description
 * # CharacterDropCtrl
 * Controller of the tbsApp
 */
angular.module('tbsApp')
  .controller('CharacterDropCtrl', function ($scope, $modalInstance, RCharacter, drop_from, char_ref) {
    if(drop_from.length === 0 || drop_from === undefined){
        $scope.where = [{stage_ref: 'nowhere known', percent: null}];
    } else {
        $scope.where = drop_from ;
    }
    $scope.char_ref = char_ref;
    
    RCharacter.get({ ref: char_ref }, function(data){
        $scope.char_name = data.name;
    });
    $scope.ok = function(){
        $modalInstance.dismiss('close');
    };
  });
