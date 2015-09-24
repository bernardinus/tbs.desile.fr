'use strict';

/**
 * @ngdoc function
 * @name tbsApp.controller:TbEventListCtrl
 * @description
 * # TbEventListCtrl
 * Controller of the tbsApp
 */
angular.module('tbsApp').controller('TbEventListCtrl', function ($scope, RTBServerStatus, RTBEventName) {
    RTBServerStatus.get(function(data){
        $scope.events = [];
        $scope.keys = [];
        var now = moment();
        for(var key in data.eventFlags){
            var ev = data.eventFlags[key];
            ev.key = key;
            if(ev.startDate && ev.endDate){
                ev.start_date = moment.utc(ev.startDate, 'M/D/YYYY');
                ev.end_date   = moment.utc(ev.endDate, 'M/D/YYYY');
                if(ev.end_date > now && ! ev.key.match(/slot_event_desc_/) && ! ev.key.match(/buddy_event_desc_/)){
                    ev.isCurrent = (ev.start_date <= now && ev.end_date >= now);
                    ev.isFuture = (ev.start_date > now);
                    ev.isPast = (ev.end_date < now);
                    ev.name = RTBEventName.getNameForKey(ev.key);
                    
                    $scope.events.push(ev);
                }
            }
            $scope.keys.push(key);
        }
    });
    
    $scope.filterIsCurrent = function(item){ return item.isCurrent == true; }
    $scope.filterIsFuture  = function(item){ return item.isFuture  == true; }
});
