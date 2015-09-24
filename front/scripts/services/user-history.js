'use strict';

/**
 * @ngdoc service
 * @name tbsApp.userHistory
 * @description
 * # userHistory
 * Service in the tbsApp.
 */
angular.module('tbsApp').service('UserHistory', function($http, $q, Session) {
    var REST = 'api/index.php';
    // AngularJS will instantiate a singleton by calling "new" on this function
    var userHist = {};

    userHist.between = function(from, to) {
        var pdata = {
            'username' : Session.username,
            'token' : Session.token,
            'from' : from,
            'to' : to
        };
        var defer = $q.defer();
        $http.post(REST + '/history', pdata).success(function(data) {
            defer.resolve(data);
        }).error(function(error) {
            defer.reject('error getting history : ' + error);
        });
        return defer.promise;
    };

    userHist.one_month = function(one) {
        var pdata = {
            'username' : Session.username,
            'token' : Session.token,
            'month' : one
        };
        var defer = $q.defer();
        $http.post(REST + '/history', pdata).success(function(data) {
            defer.resolve(data);
        }).error(function(error) {
            defer.reject('error getting history : ' + error);
        });
        return defer.promise;
    };

    userHist.get = function() {
        var pdata = {
            'username' : Session.username,
            'token' : Session.token
        };
        var defer = $q.defer();
        $http.post(REST + '/history', pdata).success(function(data) {
            defer.resolve(data);
        }).error(function(error) {
            defer.reject('error getting history : ' + error);
        });
        return defer.promise;
    };

    userHist.exists = function(date) {
        var pdata = {
            'username' : Session.username,
            'token' : Session.token,
            'date' : date
        };
        var defer = $q.defer();
        $http.post(REST + '/history_exists', pdata).success(function(data) {
            defer.resolve(data);
        }).error(function(data) {
            defer.reject(data.message);
        });
        return defer.promise;
    };

    userHist.upload = function(content, date) {
        var pdata = {
            'username' : Session.username,
            'token' : Session.token,
            'date' : date,
            'data' : content
        };
        var defer = $q.defer();
        $http.post(REST + '/history_upload', pdata).success(function(data) {
            defer.resolve(data);
        }).error(function(data) {
            defer.reject(data.message);
        });
        return defer.promise;
    };

    userHist.diff = function(o1, o2) {
        var diff = {};

        var keys = ['boost', 'job_level', 'job1_level', 'job2_level', 'job3_level'];
        var key, name;

        for (var i = 0; i < keys.length; ++i) {
            diff[keys[i]] = [];
        }

        for (i = 0; i < keys.length; ++i) {
            key = keys[i];
            for (name in o1[key]) {
                if (o1[key][name] != o2[key][name]) {
                    diff[key].push({
                        key : key,
                        name : name,
                        old : o1[key][name],
                        n : o2[key][name]
                    });
                }
            }
        }

        diff.have_character = [];
        key = 'have_character';
        for (name in o2[key]) {
            if (!o1[key]) {
                diff[key].push({
                    key : key,
                    name : name
                });
            } else {
                if (!o1[key][name] && o2[key][name]) {
                    diff[key].push({
                        key : key,
                        name : name
                    });
                }
            }
        }

        return diff;
    };

    return userHist;
});
