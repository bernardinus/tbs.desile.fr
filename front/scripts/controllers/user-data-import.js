'use strict';

/**
 * @ngdoc function
 * @name tbsApp.controller:UserDataImportCtrl
 * @description
 * # UserDataImportCtrl
 * Controller of the tbsApp
 */
angular.module('tbsApp').controller('UserDataImportCtrl', function ($scope, $modalInstance) {
    $scope.dismiss = function(){
        $modalInstance.dismiss('close');
    };
    $scope.ok = function(){
        if($scope.user_data_file == undefined){
            $modalInstance.close(false);
        } else {
            $modalInstance.close($scope.user_data_file);
        }
    };
  });
