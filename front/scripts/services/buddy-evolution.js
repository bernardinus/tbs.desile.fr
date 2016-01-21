'use strict';

/**
 * @ngdoc service
 * @name tbsApp.buddyEvolution
 * @description
 * # buddyEvolution
 * Service in the tbsApp.
 */
angular.module('tbsApp').service('BuddyEvolution', function($resource, $q, UserData, RBuddyEvolution) {
    var evolution = {};
    
    evolution.quick_stats = function(){
        var defer = $q.defer();
        
        RBuddyEvolution.items(function(data){
            var needed_evolution = {
                'buddy': {},
                'items': {}
            };
            var evolve_buddies = UserData.get('evolve_buddy', {});
            var have_items     = UserData.get('have_items',   {});
            
            for(var i = 0; i < data.length; ++i){
                var b = data[i];
                if(evolve_buddies[b.from_ref] && evolve_buddies[b.from_ref] > 0){
                    if(! needed_evolution.items[b.item_ref]){
                        needed_evolution.items[b.item_ref] = {
                            name: b.item_name, 
                            count: 0
                        };
                    } 
                    needed_evolution.items[b.item_ref].count += parseInt(b.count) * evolve_buddies[b.from_ref];
                }
            }
            for(var key in needed_evolution.items){
                if(have_items[key]){
                    needed_evolution.items[key].count -= have_items[key];
                    if(needed_evolution.items[key].count <= 0){
                        delete needed_evolution.items[key];
                    }
                }
            }
            defer.resolve(needed_evolution);
        }, function(error){
            defer.reject(error);
        });
        return defer.promise;
    };
    
    evolution.item_list = function(){
        var defer = $q.defer();
        RBuddyEvolution.items(
            function(data){
                var needed = {};
                var needed_for = {};
                
                var evolve_b = UserData.get('evolve_buddy', {});
                for(var i = 0; i < data.length; ++i){
                    if(evolve_b[data[i].from_ref] && evolve_b[data[i].from_ref] > 0){
                        if(! needed[data[i].item_ref]){
                            needed[data[i].item_ref] = 0;
                        }
                        needed[data[i].item_ref] += parseInt(data[i].count) * evolve_b[data[i].from_ref];
                        if(! needed_for[data[i].item_ref]){
                            needed_for[data[i].item_ref] = [];
                        }
                        needed_for[data[i].item_ref].push({
                            count: evolve_b[data[i].from_ref],
                            from_name: data[i].from_name,
                            to_name: data[i].to_name,
                            qty: data[i].count
                        })
                    }
                }
                defer.resolve({
                    needed: needed,
                    needed_for: needed_for
                });
            },
            function(error){
                defer.reject(error);
            }
        );
        return defer.promise;
    };
    
    return evolution;
});
