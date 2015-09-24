'use strict';

/**
 * @ngdoc function
 * @name tbsApp.controller:ChapterListCtrl
 * @description
 * # ChapterListCtrl
 * Controller of the tbsApp
 */
angular.module('tbsApp').controller('ChapterListCtrl', function ($scope, RChapter) {
    $scope.chapters = RChapter.all();
});
