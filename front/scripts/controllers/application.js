'use strict';

/**
 * @ngdoc function
 * @name tbsApp.controller:ApplicationCtrl
 * @description
 * # ApplicationCtrl
 * Controller of the tbsApp
 */
angular.module('tbsApp').controller('ApplicationCtrl', function ($scope, $rootScope, $location, $anchorScroll, $routeParams, $window, USER_ROLES, AuthService, UserData) {
    $scope.currentUser = null;
    $scope.userRoles = USER_ROLES;
    $scope.isAuthorized = AuthService.isAuthorized;
    
    $scope.setCurrentUser = function (user) {
        $scope.currentUser = user;
    };

    if($window.location.origin.match(/tbs-beta/)){
        $scope.beta_version = true;
    } else {
        $scope.beta_version = false;
    }

    $scope.$on('$locationChangeStart', function () {
        if($scope.currentUser){
            UserData.dirty_upload();
        }
    });

    $rootScope.$on('$routeChangeSuccess', function() {
        $location.hash($routeParams.scrollTo);
        $anchorScroll();
    });
});
