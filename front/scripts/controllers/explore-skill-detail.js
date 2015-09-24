'use strict';

/**
 * @ngdoc function
 * @name tbsApp.controller:ExploreSkillDetailCtrl
 * @description
 * # ExploreSkillDetailCtrl
 * Controller of the tbsApp
 */
angular.module('tbsApp').controller('ExploreSkillDetailCtrl', function ($scope, $routeParams, RSkill, SkillDesc) {
    $scope.ref = $routeParams.ref;
    
    $scope.skill = RSkill.get({ ref: $scope.ref });

    $scope.range_str = function(char){
        return SkillDesc.range_desc(char);
    /**/
    };

    $scope.emit_str = function(char){
        return SkillDesc.emit_desc(char);
    };
  });
