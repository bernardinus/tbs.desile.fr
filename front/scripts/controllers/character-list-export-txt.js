'use strict';

/**
 * @ngdoc function
 * @name tbsApp.controller:CharacterListExportTxtCtrl
 * @description
 * # CharacterListExportTxtCtrl
 * Controller of the tbsApp
 */
angular.module('tbsApp').controller('CharacterListExportTxtCtrl', function($scope, $modalInstance, UserData, characters) {
    
    var have_character = UserData.get('have_character', {});
    var boost = UserData.get('boost', {});
    var jobs  = {
        level: UserData.get('job_level', {}),
        1: UserData.get('job1_level', {}),
        2: UserData.get('job2_level', {}),
        3: UserData.get('job3_level', {})
    };
    
    var t_characters = {
        Z:  {
            name: 'Z',
            order: 0,
            chars: []
        },
        SS: {
            name: 'SS',
            order: 1,
            chars: []
        },
        S:  {
            name: 'S',
            order: 2,
            chars: []
        },
        A:  {
            name: 'A',
            order: 3,
            chars: []
        },
        B:  {
            name: 'B',
            order: 4,
            chars: []
        }
    };
    
    for(var i = 0; i < characters.length; ++i){
        var c = characters[i];
        if(have_character[c.ref] && c.pact_of_truth == 1){
            var level1 = jobs[1][c.ref] || '1';
            var level2 = jobs[2][c.ref] ? '/' + jobs[2][c.ref]: '';
            var level3 = jobs[3][c.ref] ? '/' + jobs[3][c.ref]: '';
            var levels = level1 + level2 + level3;
            var b = boost[c.ref] || 0;
            t_characters[c.class_ref].chars.push({
                name: c.name,
                boost: b,
                levels: levels
            })
        }
    }
    
    $scope.characters = [];
    angular.forEach(t_characters, function(value, key){
        $scope.characters.push(value);
    });
    
    $scope.ok = function(){ $modalInstance.dismiss('close'); };
});
