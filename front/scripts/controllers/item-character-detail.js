'use strict';

/**
 * @ngdoc function
 * @name tbsApp.controller:ItemCharacterDetailCtrl
 * @description
 * # ItemCharacterDetailCtrl
 * Controller of the tbsApp
 */
angular.module('tbsApp').controller('ItemCharacterDetailCtrl', function ($scope, $modalInstance, jobs, rebirths, item_name, buddies) {
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
    
    $scope.buddies = [];
    for(var i = 0; i < buddies.length; ++i){
        $scope.buddies.push({
            count: buddies[i].count,
            from_name: buddies[i].from_name,
            to_name: buddies[i].to_name,
            needs: buddies[i].qty
        });
    }
    $scope.ok = function(){
        $modalInstance.dismiss('close');
    }
});
