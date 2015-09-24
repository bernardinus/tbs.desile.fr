'use strict';

/**
 * @ngdoc function
 * @name tbsApp.controller:ExploreSkillListCtrl
 * @description
 * # ExploreSkillListCtrl
 * Controller of the tbsApp
 */
angular.module('tbsApp').controller('ExploreSkillListCtrl', function($scope, $filter, RSkill) {
    $scope.skills = [];
    $scope.nb_col = 4;
    RSkill.all(function(skills) {
        skills = $filter('orderBy')(skills, 'name', false);
        var row = [];
        for(var i = 0; i < skills.length; ++i){
            if(row.length < $scope.nb_col){
                row.push(skills[i]);
            }
            if(row.length == $scope.nb_col){
                $scope.skills.push(row);
                row = [];
            }
        }
        if(row.length > 0){
            $scope.skills.push(row);
        }
    });
});
