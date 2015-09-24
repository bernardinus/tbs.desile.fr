'use strict';

/**
 * @ngdoc function
 * @name tbsApp.controller:ItemCharacterDetailCtrl
 * @description
 * # ItemCharacterDetailCtrl
 * Controller of the tbsApp
 */
angular.module('tbsApp').controller('ItemCharacterDetailCtrl', function ($scope, $modalInstance, jobs, rebirths, item_name) {
    $scope.name = item_name;
    $scope.jobs = [];
    for(var j in jobs){
        $scope.jobs.push({
            name: j,
            needs: jobs[j]
        });
    }
    
    $scope.rebirths = []; //rebirths;
    for(var r in rebirths){
        $scope.rebirths.push({
            name: r,
            needs: rebirths[r]
        });
    }
    $scope.ok = function(){
        $modalInstance.dismiss('close');
    }
});
