'use strict';

/**
 * @ngdoc function
 * @name tbsApp.controller:ItemDropCtrl
 * @description
 * # ItemDropCtrl
 * Controller of the tbsApp
 */
angular.module('tbsApp').controller('ItemDropCtrl', function ($scope, $modalInstance, drop, name) {
    $scope.drop = [];
    for(var i = 0; i < drop.length; ++i){
        if($scope.drop.indexOf(drop[i]) == -1){
            $scope.drop.push(drop[i]);
        }
    }
    $scope.name = name;
    $scope.ok = function(){
        $modalInstance.dismiss('close');
    }
  });
