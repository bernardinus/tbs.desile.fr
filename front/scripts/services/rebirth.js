'use strict';

/**
 * @ngdoc service
 * @name tbsApp.rebirth
 * @description
 * # rebirth
 * Service in the tbsApp.
 */
angular.module('tbsApp').service('Rebirth', function($resource, $q, UserData, RRebirth) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var rebirth = {};

    rebirth.quick_stats = function() {
        var defer = $q.defer();

        RRebirth.all(function(rebirths) {
            var needed_rebirth = {
                'char' : {},
                'items' : {},
                'monsters' : {}
            };
            var have_character = UserData.get('have_character', {});
            var have_items = UserData.get('have_items', {});
            var job1_level = UserData.get('job1_level', {});

            for (var i = 0; i < rebirths.length; ++i) {
                var r = rebirths[i], j;
                if (have_character[r.src_ref] && ! have_character[r.dst_ref]) {
                    /* check level & jobs */

                    /* check items */
                    for (j = 0; j < r.items.length; ++j) {
                        var item = r.items[j];
                        if (!needed_rebirth.items[item.item_ref]) {
                            needed_rebirth.items[item.item_ref] = {
                                name : item.item_name,
                                count : 0
                            };
                        }
                        needed_rebirth.items[item.item_ref].count += parseInt(item.count);
                    }
                    /* check monster */
                    for (j = 0; j < r.monsters.length; ++j) {
                        var monster = r.monsters[j];
                        if (!needed_rebirth.monsters[monster.monster_ref]) {
                            needed_rebirth.monsters[monster.monster_ref] = {
                                name : monster.monster_name,
                                reason : ''
                            };
                        }
                        if (!have_character[monster.monster_ref]) {
                            needed_rebirth.monsters[monster.monster_ref].reason = 'missing';
                        } else if (job1_level[monster.monster_ref] < monster.level) {
                            needed_rebirth.monsters[monster.monster_ref].reason = 'level too low';
                        } else {
                            delete needed_rebirth.monsters[monster.monster_ref];
                        }
                    }
                }
            }
            for (var key in needed_rebirth.items) {
                if (have_items[key]) {
                    needed_rebirth.items[key].count -= have_items[key];
                    if (needed_rebirth.items[key].count <= 0) {
                        delete needed_rebirth.items[key];
                    }
                }
            }

            defer.resolve(needed_rebirth);
        }, function(error) {
            defer.reject(error);
        });
        return defer.promise;
    };

    rebirth.item_list = function() {
        var defer = $q.defer();
        RRebirth.all(
            function(rebirths) {
                var needed_items = {};
                var future_needed_items = {};
                var needed_items_for = {};
                var future_needed_items_for = {};
                
                var have_character = UserData.get('have_character', {});
                for (var i = 0; i < rebirths.length; ++i) {
                    var r = rebirths[i], j, item;
                    if (have_character[r.src_ref] && ! have_character[r.dst_ref]) {
                        for (j = 0; j < r.items.length; ++j) {
                            item = r.items[j];
                            if (! needed_items[item.item_ref])                 { needed_items[item.item_ref] = 0; }
                            if (! needed_items_for[item.item_ref])             { needed_items_for[item.item_ref] = {}; }
                            if (! needed_items_for[item.item_ref][r.src_name]) { needed_items_for[item.item_ref][r.src_name] = []; }
                            needed_items[item.item_ref] += parseInt(item.count);
                            needed_items_for[item.item_ref][r.src_name].push([r.dst_name, item.count]);
                        }
                    } else if(! have_character[r.src_ref] && ! have_character[r.dst_ref]){
                        for (j = 0; j < r.items.length; ++j) {
                            item = r.items[j];
                            if (!future_needed_items[item.item_ref])                 { future_needed_items[item.item_ref] = 0; }
                            if (!future_needed_items_for[item.item_ref])             { future_needed_items_for[item.item_ref] = {}; }
                            if (!future_needed_items_for[item.item_ref][r.src_name]) { future_needed_items_for[item.item_ref][r.src_name] = []; }
                            future_needed_items[item.item_ref] += parseInt(item.count);
                            future_needed_items_for[item.item_ref][r.src_name].push([r.dst_name, item.count]);
                        }
                    }
                }
                
                defer.resolve({ 
                    current: needed_items, 
                    future: future_needed_items,
                    current_for: needed_items_for,
                    future_for: future_needed_items_for
                });
            }, 
            function(error){ defer.reject(error); }
        );
        return defer.promise;
    };

    return rebirth;
});
