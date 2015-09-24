'use strict';

/**
 * @ngdoc function
 * @name tbsApp.controller:StageDropCtrl
 * @description
 * # StageDropCtrl
 * Controller of the tbsApp
 */
angular.module('tbsApp')
  .controller('StageDropCtrl', function ($scope, $modalInstance, drops, stage_ref) {
    if(drops.length == 0){
    $scope.drops = ['nothing'];
    } else {
    $scope.drops = drops ;
    }
    $scope.stage_ref = stage_ref;
    $scope.ok = function(){
    $modalInstance.dismiss('close');
    };
  });
