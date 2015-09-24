'use strict';

/**
 * @ngdoc function
 * @name tbsApp.controller:HistoryImportCtrl
 * @description
 * # HistoryImportCtrl
 * Controller of the tbsApp
 */
angular.module('tbsApp')
  .controller('HistoryImportCtrl', function ($scope, $modalInstance, UserHistory) {
    $scope.file_changed = function(input){
        var name = input.files[0].name;
        // tbs_Matthieu-2015-02-21-12-24.json
        var m = name.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/);
        if(m.length > 0){
            $scope.file_date = new Date(m[0]);
        }
        
    }
    
    $scope.dismiss = function(){
        $modalInstance.dismiss('close');
    };
    
    $scope.ok = function(){
        function pad(s) { return (s < 10) ? '0' + s : s; }
    if(! $scope.file_date){
        $scope.error = "You must set a date";
        return;
    }
        var date = [
            $scope.file_date.getFullYear(),
            pad($scope.file_date.getMonth() + 1),
            pad($scope.file_date.getDate()), 
        ].join('-');
        UserHistory.exists(date).then(/*success*/function(data){
            if(data.count == 0){
                UserHistory.upload($scope.user_data_file, date).then(/*success*/function(){
                        $modalInstance.close(true);
                    }, /*error*/function(data){
                        $scope.error = data.message;
                    });
            } else {
                    $scope.error = "History already exists for this date";
            }
        }, /*error*/function(){
                
        });
    };
  });
