'use strict';

/**
 * @ngdoc service
 * @name tbsApp.resStage
 * @description
 * # resStage
 * Factory in the tbsApp.
 */
angular.module('tbsApp').factory('RStage', function($resource, ResourceBase) {
    // Service logic
    var rstage = $resource(ResourceBase.href() + 'api/index.php/stage/:ref', {}, {
        all: {
            url: ResourceBase.href() + 'api/index.php/stages',
            method: 'GET',
            isArray: true,
            cache: true
        }
    });
    
    angular.extend(rstage, {
        inChapter: $resource(ResourceBase.href() + 'api/index.php/stages_by_chapter/:ref', {}, {
            all: {
                method: 'GET',
                isArray: true,
                cache: true
            }
        }),
        items: $resource(ResourceBase.href() + 'api/index.php/stage_item_t', {}, {
            all: {
                method: 'GET',
                isArray: true,
                cache: true
            }
        }),
        characters: $resource(ResourceBase.href() + 'api/index.php/stage_character_t', {}, {
            all: {
                method: 'GET',
                isArray: true,
                cache: true
            }
        }),
        buddies: $resource(ResourceBase.href() + 'api/index.php/stage_buddy', {}, {
            all: {
                method: 'GET',
                isArray: true,
                cache: true
            }
        })
    });

    // Public API here
    return rstage;
});
