'use strict';

/**
 * @ngdoc function
 * @name tbsApp.controller:MzListCtrl
 * @description
 * # MzListCtrl
 * Controller of the tbsApp
 */
angular.module('tbsApp')
  .controller('MzListCtrl', function ($scope, $modal, UserData) {
    $scope.mz_exp  = UserData.get('mz_exp', {});
    $scope.mz = [
        { ref: 'mz1', name: 'Metal Zone 1', stamina: 10 },
        { ref: 'mz2', name: 'Metal Zone 2', stamina: 15 },
        { ref: 'mz3', name: 'Metal Zone 3', stamina: 20 },
        { ref: 'mz4', name: 'Metal Zone 4', stamina: 25 },
        { ref: 'mz5', name: 'Metal Zone 5', stamina: 35 },
        { ref: 'mz6', name: 'Metal Zone 6', stamina: 45 }
    ];
    
    $scope.edit = function(ref){
        var modalInstance = $modal.open({
            templateUrl: 'views/mz-edit.html',
        controller: 'MzEditCtrl',
        size: 'lg',
        resolve: {
        mz_exp: function(){
            return $scope.mz_exp[ref];
        },
        ref: function(){
            return ref;
                }
            }
    });
    modalInstance.result.then(function(val){
            if(val.exps != undefined){
        $scope.mz_exp[ref] = val.exps;
            }
        UserData.set('mz_exp', $scope.mz_exp);
    });
    };
  });
