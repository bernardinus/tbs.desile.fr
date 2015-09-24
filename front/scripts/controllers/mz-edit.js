'use strict';

/**
 * @ngdoc function
 * @name tbsApp.controller:MzEditCtrl
 * @description
 * # MzEditCtrl
 * Controller of the tbsApp
 */
angular.module('tbsApp')
  .controller('MzEditCtrl', function ($scope, $modalInstance, ref, mz_exp) {
    $scope.stage_ref = ref;

    $scope.mz_exp = mz_exp || [];
    
    $scope.add = function(){
        if($scope.new_exp != undefined && $scope.new_exp != 0){
            $scope.mz_exp.push(parseInt($scope.new_exp));
        }
        if($scope.new_exp == undefined){
            $scope.ok();
        }
        $scope.new_exp = undefined;
    };

    $scope.remove_exp = function(value){
        var index = $scope.mz_exp.indexOf(value);
        if(index != -1){
            $scope.mz_exp.splice(index, 1);
        }
    };

    $scope.ok = function(){
        $modalInstance.close({
            exps: $scope.mz_exp,
        });
    };
    
    $scope.cancel = function(){ $modalInstance.dismiss('cancel'); };
  });
