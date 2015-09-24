'use strict';

/**
 * @ngdoc function
 * @name tbsApp.controller:NavbarCtrl
 * @description
 * # NavbarCtrl
 * Controller of the tbsApp
 */
angular.module('tbsApp').controller('NavbarCtrl', function($scope, $modal, $route, $http, gettextCatalog, UserData, Session, $location) {
    $scope.navbar = {
        collapsed : true
    };
    
    $scope.$on('$routeChangeSuccess', function () {
        $scope.navbar.collapsed = true;
    });

    $scope.import = function() {
        var modalInstance = $modal.open({
            templateUrl : 'views/user-data-import.html',
            controller : 'UserDataImportCtrl'
        });

        modalInstance.result.then(function(user_data) {
            var data = JSON.parse(user_data);
            if (data) {
                UserData.import(data);
                $route.reload();
            }
        });
    };

    $scope.import_sample = function() {
        $http.get('tbs_user_data.json').success(function(data) {
            if (data) {
                UserData.import(data);
                $route.reload();
            }
        });
    };

    $scope.export = function() {
        UserData.save_dialog();
    };

    document.addEventListener("keydown", function(e) {
        if (e.keyCode == 83/*'s'*/ && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
            e.preventDefault();
            $scope.export();
        }
    }, false);

    $scope.reset = function() {
        var a = prompt("Are you sure you want to reset ? If so, type RESET");
        if (a == "RESET") {
            UserData.clear();
            $route.reload();
        }
    }
    /* Remote */
    $scope.logout = function() {
        if (UserData.isDirty()) {
            if (! confirm('You have unsaved data; really logout ?')) {
                return;
            }
        }
        Session.destroy();
        $scope.setCurrentUser(false);
        $location.path('/');
    }

    $scope.upload = function() {
        UserData.upload();
    }
    /* Locale */
    var locale = localStorage['locale'] ? angular.fromJson(localStorage['locale']) : 'en';
    if (locale.indexOf('"') == 0) {
        $scope.locale = angular.fromJson(locale);
        // save correct version
        localStorage['locale'] = angular.toJson(locale);
    } else {
        $scope.locale = locale;
    }
    gettextCatalog.setCurrentLanguage($scope.locale);
});
