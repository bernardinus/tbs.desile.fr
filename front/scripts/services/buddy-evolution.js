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
            //var have_buddies   = UserData.get('have_buddy', {});
            var evolve_buddies = UserData.get('evolve_buddy', {});
            //var qty_buddies  = UserData.get('qty_buddy', {});
            var have_items   = UserData.get('have_items', {});
            
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
    
    return evolution;
});
