'use strict';

/**
 * @ngdoc function
 * @name tbsApp.controller:ExploreBuddyEvolutionGraphCtrl
 * @description
 * # ExploreBuddyEvolutionGraphCtrl
 * Controller of the tbsApp
 */
angular.module('tbsApp').controller('ExploreBuddyEvolutionGraphCtrl', function($scope, RBuddyEvolution) {
    var colors = {
        'SS': 'd5b54f',
        'S' : 'a3a4a8',
        'A' : 'b9322c',
        'B' : 'ef761e',
        'C' : 'aa84b8',
        'D' : '508ea5'
    };
    
    $scope.text_filter = "";
    
    var network;
    
    $scope.update_filter = function(){
        console.log('filter', $scope.text_filter);
        if($scope.text_filter){
            network.options.configure = {
                filter: function(data){ return data.label.match($scope.text_filter); }
            };
            network.setOptions(network.options);
        } else {
            delete network.options.configure.filter;
            network.setOptions(network.options);
        }
        
    };
    
    
    
    RBuddyEvolution.all(function(data){
        var nodes = [];
        var edges = [];
        for(var i = 0; i < data.length; ++i){
            if(data[i].to_id && data[i].to_id != null){
                var node = {
                    id: parseInt(data[i].from_id),
                    label: data[i].from_name + ' (' + data[i].from_rarity + ')',
                    color: '#' + colors[data[i].from_rarity]
                };
                nodes.push(node);
            
                var edge = {
                    from: parseInt(data[i].from_id),
                    to:   parseInt(data[i].to_id),
                    arrows: 'to'
                };
                edges.push(edge);
            }
        }
        var container = document.getElementById('mynetwork');
          var data = {
            nodes: new vis.DataSet(nodes),
            edges: new vis.DataSet(edges)
          };
          var options = {};
          network = new vis.Network(container, data, options);
    });
});
