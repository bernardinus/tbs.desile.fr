'use strict';

/**
 * @ngdoc service
 * @name tbsApp.itemCounter
 * @description
 * # itemCounter
 * Service in the tbsApp.
 */
angular.module('tbsApp').service('ItemCounter', function($q, RJob, UserData) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return { 
        get: function() {
            var defer = $q.defer();
            var job_level     = UserData.get('job_level', {});
            var eidolon_level = UserData.get('eidolon_level', {});
            var characters    = UserData.get('have_character', {});
            var eidolons      = UserData.get('have_eidolon', {});
            var have = [];
            var result = {
                item_needed :         {},
                item_needed_by_char : {},
                future_item_needed :  {},
                future_item_needed_by_char : {}
            };
    
            for (var c in characters) {
                if (characters[c] === true) {
                    have.push(c);
                }
            }
            for (var e in eidolons) {
                if (eidolons[e] === true) {
                    have.push(e);
                }
            }
            for (var l in eidolon_level) {
                if (eidolons[l] === true) {
                    job_level[l] = eidolon_level[l];
                }
            }
    
            RJob.items.all(function(job_item) {
                for (var i = 0; i < job_item.length; ++i) {
                    var character_ref = job_item[i].character_ref;
                    var character_name = job_item[i].character_name;
                    var item_ref = job_item[i].item_ref;
                    var level = '0';
                    if (job_item[i].level) {
                        level = job_item[i].level.toString();
                    }
                    var item_qty = job_item[i].item_qty;
                    /* we have this character */
                    if (character_ref && have.indexOf(character_ref) != -1) {
                        // so we need this items globally
                        if (parseInt(level) > job_level[character_ref]) {
                            if (!result.item_needed[item_ref]) {
                                result.item_needed[item_ref] = parseInt(item_qty);
                            } else {
                                result.item_needed[item_ref] += parseInt(item_qty);
                            }
    
                            if (!result.item_needed_by_char[item_ref]) {
                                result.item_needed_by_char[item_ref] = {};
                            }
                            if (!result.item_needed_by_char[item_ref][character_name]) {
                                result.item_needed_by_char[item_ref][character_name] = [];
                            }
                            result.item_needed_by_char[item_ref][character_name].push([level, item_qty]);
                        }
                    } else {
                        if (!result.future_item_needed[item_ref]) {
                            result.future_item_needed[item_ref] = parseInt(item_qty);
                        } else {
                            result.future_item_needed[item_ref] += parseInt(item_qty);
                        }
                        if (!result.future_item_needed_by_char[item_ref]) {
                            result.future_item_needed_by_char[item_ref] = {};
                        }
                        if (!result.future_item_needed_by_char[item_ref][character_name]) {
                            result.future_item_needed_by_char[item_ref][character_name] = [];
                        }
                        result.future_item_needed_by_char[item_ref][character_name].push([level, item_qty]);
                    }
                }
    
                defer.resolve(result);
            }, function(error) {
                defer.reject(error);
            });
    
            return defer.promise;
        }
    };
});
