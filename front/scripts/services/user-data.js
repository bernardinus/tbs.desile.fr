'use strict';

/**
 * @ngdoc service
 * @name tbsApp.userData
 * @description
 * # userData
 * Service in the tbsApp.
 */
angular.module('tbsApp').service('UserData', function($http, Session) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var userData = {};

    userData.import = function(data) {
        if (data === null) {
            return;
        }
        if ( typeof data === 'string') {
            data = angular.fromJson(data);
        }
        // v1
        var key;
        if (!data.version || data.version === 1) {
            for (key in data) {
                if ( typeof (data.key) !== 'function') {
                    localStorage[key] = data[key];
                }
            }
        } else if (data.version === 2) {
            for (key in data) {
                if ( typeof (data.key) !== 'function' && key !== 'length') {
                    localStorage[key] = angular.toJson(data[key]);
                }
            }
        }
        this.setDirty(true);
    };

    userData.upload = function() {
        var data = {
            'username' : Session.username,
            'token' : Session.token,
            'user_data' : this.export()
        };
        var me = this;
        if (data.user_data.stage_exp) {
            delete data.user_data.stage_exp;
        }
        if (data.user_data.stage_coin) {
            delete data.user_data.stage_coin;
        }
        $http.post('api/index.php/save', data).success(function() {
            me._flashButton('btn-success');
            me.setDirty(false);
        }).error(function() {
            me._flashButton('btn-danger');
        });
    };

    userData._flashButton = function(class_) {
        jQuery('button#upload').addClass(class_).delay(500).queue(function(next) {
            jQuery(this).removeClass(class_);
            next();
        });
    };

    userData._dirty = false;

    userData.isDirty = function() {
        return this._dirty;
    };

    userData.setDirty = function(value) {
        if (value === false) {
            jQuery('button#upload').removeClass('btn-warning');
        } else {
            jQuery('button#upload').addClass('btn-warning');
        }
        this._dirty = value;
    };

    userData.dirty_upload = function() {
        if (this.isDirty()) {
            this.upload();
            this.setDirty(false);
        }
    };

    userData.export = function() {
        var data = {};
        for (var key in localStorage) {
            if (angular.isDefined(localStorage[key]) && ! key.match(/^nosave_/)) {
                data[key] = angular.fromJson(localStorage[key]);
            }
        }
        data.version = 2;
        return JSON.stringify(data);
    };

    userData.clear = function() {
        localStorage.clear();
        this.setDirty(false);
    };

    userData.get = function(key, default_value) {
        if (localStorage[key]) {
            if (angular.isUndefined(localStorage[key])) {
                if (angular.isDefined(default_value)) {
                    return default_value;
                } else {
                    return undefined;
                }
            } else {
                return angular.fromJson(localStorage[key]);
            }
        } else if (angular.isDefined(default_value)) {
            return angular.copy(default_value);
        }
    };

    userData.set = function(key, value) {
        localStorage[key] = angular.toJson(value);
        if(! key.match(/^nosave_/)){
            this.setDirty(true);
        }
    };

    userData.save_dialog = function() {
        var user_data = userData.export();
        var blob = new Blob([user_data], {
            type : 'application/json'
        });
        var now = new Date();
        var username = localStorage.id ? angular.fromJson(localStorage.id) : 'user_data';
        var zfill = function(num, len) {
            return (new Array(len).join('0') + num).slice(-len);
        };
        var fname = 'tbs_' + username + '-' + now.getFullYear() + '-' + zfill(parseInt(now.getMonth()) + 1, 2) + '-' + zfill(parseInt(now.getDate()), 2) + '-' + zfill(parseInt(now.getHours()), 2) + '-' + zfill(parseInt(now.getMinutes()), 2) + '.json';
        window.saveAs(blob, fname);
    };

    return userData;
}); 