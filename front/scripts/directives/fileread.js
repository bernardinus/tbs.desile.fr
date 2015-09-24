'use strict';

/**
 * @ngdoc directive
 * @name tbsApp.directive:fileread
 * @description
 * # fileread
 */
angular.module('tbsApp')
  .directive('fileread', [function () {
    return {
        scope: {
            fileread: "="/*,
            filename: "="*/
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;
                        //scope.filename = changeEvent.target.files[0].name;
                    });
                }
                //reader.readAsDataURL(changeEvent.target.files[0]);
                reader.readAsText(changeEvent.target.files[0]);
            });
        }
    }
}]);
