'use strict';

/**
 * @ngdoc function
 * @name tbsApp.controller:FooterCtrl
 * @description
 * # FooterCtrl
 * Controller of the tbsApp
 */
angular.module('tbsApp').controller('FooterCtrl', function ($scope, Session, AUTH_EVENTS) {
    $scope.$on(AUTH_EVENTS.loginSuccess, function(){
    $scope.username = Session['username'];
    });
});
