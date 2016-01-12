'use strict';

/**
 * @ngdoc function
 * @name tbsApp.controller:ExploreBuddyTharosCtrl
 * @description
 * # ExploreBuddyTharosCtrl
 * Controller of the tbsApp
 */
angular.module('tbsApp').controller('ExploreBuddyTharosCtrl', function ($scope, RBuddy, BuddyData) {
    RBuddy.all(function(data){
        for(var i = 0; i < data.length; ++i){
            data[i].class_order = parseInt(data[i].class_order);
            data[i].sort_id = parseInt(data[i].sort_id);
            data[i].atk_max = parseInt(data[i].atk_max);
            data[i].def_max = parseInt(data[i].def_max);
            data[i].satk_max = parseInt(data[i].satk_max);
            data[i].sdef_max = parseInt(data[i].sdef_max);
            data[i].exp_max  = parseInt(data[i].exp_max)
            data[i].exp_coeff = parseFloat(data[i].exp_coeff);
            
            data[i].exp = BuddyData.GetParamAtLevel('EXP', data[i].max_level, 0, data[i].exp_max, data[i].exp_coeff);
            delete data[i].desc;
        };
        $scope.buddies = data;
    });
    
    $scope.filter_text = function(item){
        return item.name != 'text';
    };
});
