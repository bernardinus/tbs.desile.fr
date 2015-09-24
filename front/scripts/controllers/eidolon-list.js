'use strict';

/**
 * @ngdoc function
 * @name tbsApp.controller:EidolonListCtrl
 * @description
 * # EidolonListCtrl
 * Controller of the tbsApp
 */
angular.module('tbsApp').controller('EidolonListCtrl', function ($scope, $routeParams, $modal, REidolon, UserData) {
    $scope.have_eidolon = UserData.get('have_eidolon',  {});
    $scope.job_level    = UserData.get('eidolon_level', {});
    
    $scope.characters = [];
    REidolon.all(function(data){
        var _char = null;
        for(var i = 0; i < data.length; ++i){
            _char = angular.copy(data[i]);
            _char.max_job = parseInt(data[i].max_job);
            $scope.characters.push(_char);
        }
    });

    $scope.toggle = function(ref){
        UserData.set('have_eidolon', $scope.have_eidolon);
    };
    
    $scope.job_change = function(ref){
        UserData.set('eidolon_level', $scope.job_level);
    };
  });
