'use strict';

/**
 * @ngdoc function
 * @name tbsApp.controller:AccountCreateCtrl
 * @description
 * # AccountCreateCtrl
 * Controller of the tbsApp
 */
angular.module('tbsApp').controller('AccountCreateCtrl', function ($scope, $modalInstance, $http, md5) {
    $scope.warning = undefined;
    $scope.error = undefined;
    $scope.success = undefined;
    
    $scope.submit = function(user){
        /* reset messages */
        $scope.warning = undefined;
        $scope.error = undefined;
        $scope.success = undefined;
        
        if(user.captcha.response === ''){
            $scope.warning = "Prove you're not a robot (or a smart one)";
            return false;
        }
        $http({
            url: 'api/index.php/account_exists',
            method: 'GET',
            params: { username: user.name }
        }).success(function(data){
            if(data.count === 0){
                $http.post('api/index.php/account_create', {
                    username: user.name,
                    password: md5.createHash(user.password),
                    recaptcha: user.captcha
                }).success(function(){
                    $scope.error   = undefined;
                    $scope.warning = undefined;
                    $scope.success = 'Account created';
                    setTimeout(function(){
                        $modalInstance.close(true);
                    }, 1000);
                    
                }).error(function(data){
                    $scope.error = data.message;
                });
            } else {
                $scope.warning = 'This account name already exists.';
            }
        }).error(function(data){
            $scope.error = data.message;
        });
    };
    
    $scope.dismiss = function(){ $modalInstance.dismiss('cancel'); };
  });
