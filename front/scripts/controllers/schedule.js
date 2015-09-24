'use strict';

/**
 * @ngdoc function
 * @name tbsApp.controller:ScheduleCtrl
 * @description
 * # ScheduleCtrl
 * Controller of the tbsApp
 */
angular.module('tbsApp').controller('ScheduleCtrl', function($scope, $compile, uiCalendarConfig, MetalZone, DailyQuest, DailyBonus) {
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    var client_timezone = jstz.determine().name();
    $scope.client_timezone = client_timezone;
    moment.tz.setDefault(client_timezone);
    var defaultView = 'agendaWeek';
    if ($(window).width() < 992) {
        defaultView = 'agendaDay';
    }
    
    $scope.eventRender = function( event, element, view){
        if(event.desc){
            element.find('.fc-title').append("<br/>" + event.desc);
        } 
        $compile(element)($scope);
    };
    
    $scope.uiConfig = {
        calendar : {
            defaultView : defaultView,
            //height: '100%',
            slotDuration : '00:30:00',
            timeFormat : '',
            axisFormat : 'HH:mm',
            firstDay : 1,
            timezone : client_timezone,
            eventRender: $scope.eventRender
        }
    };

    $scope.filters = {
        mz1 : true,
        mz2 : true,
        mz3 : true,
        mz4 : true,
        mz5 : true,
        mz6 : true,
        only_king : false
    }

    $scope.reloadSource = function() {
        $('#calendar').fullCalendar('refetchEvents');
    };

    var mz_fn = function(start, end, timezone, callback) {
        var _start = start.clone().tz(client_timezone).hours(0);
        var _end = end.clone().tz(client_timezone).hours(0);
        var events = [];
        moment().range(_start, _end).by('hours', function(date) {
            moment.tz(client_timezone);
            var jst = date.clone().tz("Asia/Tokyo");
            for (var level = 1; level <= 6; ++level) {
                var timespan = moment.duration(jst.diff(MetalZone.reference_date));
                var days = parseInt(timespan.as('days')) + (level - 1);
                var duration = (level == 1 ? 2 : 1);
                var infos = MetalZone.GetMetalTypeAtTime(days, jst.get('hours'), jst.get('minutes'), duration);
                switch(infos.type) {
                    case "Normal":
                        if ($scope.filters['mz' + level] && !$scope.filters.only_king) {
                            if(level == 1){
                                if(infos.remain > 60){
                                    events.push({
                                        title : "MZ" + level,
                                        start : date, //.tz(client_timezone),
                                        end : date.clone().add(duration, 'hours'),
                                        className : ['mz', 'mz-' + level]
                                    });
                                }
                            } else {
                                events.push({
                                    title : "MZ" + level,
                                    start : date.tz(client_timezone),
                                    end : date.clone().add(duration, 'hours'),
                                    className : ['mz', 'mz-' + level]
                                });
                            }
                        }
                        break;
                    case "King":
                        if ($scope.filters['mz' + level] || $scope.filters.only_king){
                            events.push({
                                title : "MZ" + level + " AHtK",
                                start : date,
                                end : date.clone().add(1, 'hours'),
                                className : ['mz', 'mz-' + level, 'mz-king']
                            });
                        }
                }
            }
        });
        callback(events);
    };

    var dq_fn = function(start, end, timezone, callback){
        var events = [];
        moment().range(start, end).by('days', function(date){
            var title = DailyQuest.forDate(date);
            if(title != '-'){
                var e = {
                    title: title,
                    start: date,
                    allDay: true,
                    className: 'event-daily-quest'
                };
                events.push(e);
            }
        });
        callback(events);
    }
    
    var db_fn = function(start, end, timezone, callback){
        var events = [];
        moment().range(start, end).by('days', function(date){
            var bonus = DailyBonus.bonusForDate(date);
            if(bonus.name != 'nothing'){
                var className = 'event-item-2x';
                if(bonus.name.match(/Monster/g)){
                    className = 'event-monster-2x';
                }
                var e = {
                    title: bonus.name,
                    start: date,
                    allDay: true,
                    className: className,
                    desc: bonus.chapters.join(', '),
                    url: '#/daily-bonus'
                };
                events.push(e);
            }
            
        });
        callback(events);
    };

    $scope.events = [mz_fn, dq_fn, db_fn];

});
