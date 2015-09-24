'use strict';

/**
 * @ngdoc function
 * @name tbsApp.controller:StageEditCtrl
 * @description
 * # StageEditCtrl
 * Controller of the tbsApp
 */
angular.module('tbsApp').controller('StageEditCtrl', function($scope, $modalInstance, ref, stage_exp) {
    $scope.stage_ref = ref;

    $scope.stage_exp = stage_exp || [];

    $scope.add = function() {
        if ($scope.new_exp != undefined && $scope.new_exp != 0) {
            $scope.stage_exp.push(parseInt($scope.new_exp));
        }
        if ($scope.new_exp == undefined) {
            $scope.ok();
        }

        $scope.new_exp = undefined;
    };

    $scope.remove_exp = function(value) {
        var index = $scope.stage_exp.indexOf(value);
        if (index != -1) {
            $scope.stage_exp.splice(index, 1);
        }
    };

    $scope.ok = function() {
        $modalInstance.close({
            exps : $scope.stage_exp
        });
    };

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
});
