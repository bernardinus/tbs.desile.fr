'use strict';

/**
 * @ngdoc function
 * @name tbsApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the tbsApp
 */
angular.module('tbsApp').controller('LoginCtrl', function($scope, $rootScope, $location, AuthService, AUTH_EVENTS, UserData, $modal) {
    $scope.warning = undefined;
    $scope.overwrite = false;
    $scope.error = undefined;
    $scope.credentials = {
        username : '',
        password : ''
    };

    $scope.login = function(credentials) {
        AuthService.login(credentials).then(function(user_data) {
            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
            $scope.setCurrentUser(true);
            if (user_data != null) {
                UserData.clear();
                UserData.import(user_data);
            }
            $location.path('/');
        }, function() {
            $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
            $scope.error = "Invalid login";
        });
    };

    $scope.create_account = function() {
        $modal.open({
            templateUrl : 'views/account-create.html',
            controller : 'AccountCreateCtrl'
        });
    };

    if (localStorage.have_character) {
        $scope.overwrite = true;
    }

    $scope.save = function() {
        UserData.save_dialog();
    };
});
