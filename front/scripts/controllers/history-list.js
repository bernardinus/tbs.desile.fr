'use strict';

/**
 * @ngdoc function
 * @name tbsApp.controller:HistoryListCtrl
 * @description
 * # HistoryListCtrl
 * Controller of the tbsApp
 */
angular.module('tbsApp').controller('HistoryListCtrl', function($scope, $modal, $routeParams, $route, $window, UserHistory, UserData, DayCounter, RCharacter) {
    if (!$scope.currentUser) {
        $scope.unauthorized = true;
        console.log('you need to login');
        //return;
    }

    var history = null;
    if ($routeParams.from && $routeParams.to) {
        history = UserHistory.between($routeParams.from, $routeParams.to);
        $scope.two_dates = true;
    } else if ($routeParams.year_month) {
        history = UserHistory.one_month($routeParams.year_month);
        $scope.one_month = true;
    } else {
        history = UserHistory.get();
        $scope.two_dates = false;
    }

    if($routeParams.year_month){
        $scope.this_month = $routeParams.year_month;
        var previous_month = moment($routeParams.year_month + '-01').subtract(1, 'month');
        var num = parseInt(previous_month.month()) + 1;
        $scope.previous_month = previous_month.year() + '-' + (num < 10 ? '0' + num: num);
        var next_month = moment($routeParams.year_month + '-01').add(1, 'month');
        num = parseInt(next_month.month()) + 1;
        $scope.next_month = next_month.year() + '-' + (num < 10 ? '0' + num: num);
    }

    $scope.names = {};
    var classes_ref = {};
    var pot = {};
    var energy_ratio = {
        Z:  5 / 12,
        SS: 5 / 10,
        S:  5 / 10,
        A:  5 /  5,
        B:  5 /  5
    };
    RCharacter.all(function(data) {
        for (var i = 0; i < data.length; ++i) {
            $scope.names[data[i].ref] = data[i].name;
            classes_ref[data[i].ref] = data[i].class_ref;
            pot[data[i].ref] = (data[i].pact_of_truth == 1);
        }
        
        history.then(function(data) {
            $scope.history = [];
    
            var dates = [];
            for (var day in data) {
                dates.push(day);
            }
            $scope.total_boost = 0;
            for (var i = 1; i < dates.length; ++i) {
                var date1 = dates[i - 1];
                var date2 = dates[i];
                var diff = UserHistory.diff(data[date1], data[date2]);
                var sum_boost = 0;
                if(diff.boost){
                    for(var b = 0; b < diff.boost.length; ++b){
                        if(diff.boost[b].old < diff.boost[b].n && pot[diff.boost[b].name]){
                            var c = classes_ref[diff.boost[b].name];
                            sum_boost += (diff.boost[b].n - diff.boost[b].old) * energy_ratio[c];
                        }
                    }
                }
                $scope.total_boost += sum_boost;
                $scope.history.push({
                    from : date1,
                    to : date2,
                    diff : diff,
                    sum_boost: sum_boost
                });
            }
        });
    });

    $scope.to_day_n = function(d) {
        var d1 = new Date(d);
        var s = new Date(UserData.get('starting_date', null));
        var n = DayCounter.dayNumber(s, d1)
        return n;
    }

    $scope.import = function() {
        var modalInstance = $modal.open({
            templateUrl : 'views/history-import.html',
            controller : 'HistoryImportController'
        });
        modalInstance.result.then(function(data) {
            $route.reload();
        });
    };

    angular.element($window).on('keyup', function(event) {

        switch(event.keyCode) {
            case 37:
                // left
                console.log('keyup', 'left');
                break;
            case 39:
                // right
                console.log('keyup', 'right');
                break;
        }
    });
});
