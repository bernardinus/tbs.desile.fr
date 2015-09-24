'use strict';

/**
 * @ngdoc function
 * @name tbsApp.controller:SettingsCtrl
 * @description
 * # SettingsCtrl
 * Controller of the tbsApp
 */
angular.module('tbsApp').controller('SettingsCtrl', function($scope, gettextCatalog, UserData, DayCounter) {
    $scope.adv_default = localStorage['adv_default'] ? angular.fromJson(localStorage['adv_default']) : false;
    $scope.username = localStorage['id'] ? angular.fromJson(localStorage['id']) : undefined;
    $scope.coins_cc3 = parseInt(UserData.get('coins_cc3', 8000));
    $scope.exclude_from_levelling = UserData.get('exclude_from_levelling', []).join(', ');

    if (isNaN($scope.coins_cc3)) {
        $scope.coins_cc3 = 8000;
    }

    $scope.items_needed_default = UserData.get('items_needed_default', false);
    $scope.items_needed_future_default = UserData.get('items_needed_future_default', false);

    $scope.change_username = function() {
        localStorage['id'] = angular.toJson($scope.username);
        UserData.set('id', $scope.username);
    };

    $scope.change_adv_default = function() {
        localStorage['adv_default'] = $scope.adv_default;
        UserData.set('adv_default', $scope.adv_default);
    };

    $scope.change_have_default = function() {
        localStorage['have_default'] = $scope.have_default;
        UserData.set('have_default', $scope.have_default);
    };

    $scope.change_coins_cc3 = function() {
        if (isNaN($scope.coins_cc3)) {
            $scope.coins_cc3 = 8000;
        }
        UserData.set('coins_cc3', $scope.coins_cc3);
    }

    $scope.change_items_needed_default = function() {
        localStorage['items_needed_default'] = $scope.items_needed_default;
        UserData.set('items_needed_default', $scope.items_needed_default);
    };

    $scope.change_items_needed_future_default = function() {
        localStorage['items_needed_future_default'] = $scope.items_needed_future_default;
        UserData.set('items_needed_future_default', $scope.items_needed_future_default);
    };

    /* Starting date */
    $scope.starting_date = localStorage['starting_date'] ? new Date(angular.fromJson(localStorage['starting_date'])) : null;
    $scope.change_starting_date = function() {
        localStorage['starting_date'] = angular.toJson($scope.starting_date);
        UserData.set('starting_date', $scope.starting_date);
    };

    $scope.count_days = function() {
        if ($scope.starting_date == null || angular.isUndefined($scope.starting_date)) {
            return '';
        }
        // var now = new Date();
        var diff = DayCounter.currentDay($scope.starting_date);
        //Math.floor((now - $scope.starting_date) / 1000 / 3600 / 24);

        return diff + ' days';
    };

    $scope.increment = localStorage['settings_increment'] ? angular.fromJson(localStorage['settings_increment']) : {
        'adv' : 1,
        'mon' : 5
    };
    $scope.change_increment = function() {
        localStorage['settings_increment'] = angular.toJson($scope.increment);
        UserData.set('settings_increment', $scope.increment);
    };

    /* Exclude from levelling */
    $scope.change_exclude_from_levelling = function() {
        var names = $scope.exclude_from_levelling.split(',');
        var data = [];
        for (var i = 0; i < names.length; ++i) {
            var name = names[i].trim();
            data.push(name);
        }
        UserData.set('exclude_from_levelling', data);
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
    $scope.change_locale = function(lang) {
        localStorage['locale'] = angular.toJson(lang);
        $scope.locale = lang;
        gettextCatalog.setCurrentLanguage(lang);
        // TODO if #/help, reload page
    };

    // UpdateOn
    $scope.char_list = UserData.get('settings_char_list', {
        update_on : 'default'
    });
    $scope.xp_list = UserData.get('settings_xp_list', {
        update_on : 'default'
    });
    $scope.update_char_list_upon = function() {
        UserData.set('settings_char_list', $scope.char_list);
    };
    $scope.update_xp_list_upon = function() {
        UserData.set('settings_xp_list', $scope.xp_list);
    };
});
