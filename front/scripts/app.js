'use strict';

/**
 * @ngdoc overview
 * @name tbsApp
 * @description
 * # tbsApp
 *
 * Main module of the application.
 */
angular.module('tbsApp', [
        'ngRoute',
        'ngResource',
        'gettext',
        'ui.calendar',
        'ui.bootstrap',
        'angulartics',
        'angulartics.google.analytics',
        'reCAPTCHA',
        'angular-md5',
        'ng.deviceDetector'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/account-create',   { templateUrl: 'views/account-create.html',   controller: 'AccountCreateCtrl' })
            .when('/buddies',          { templateUrl: 'views/buddy-list.html',       controller: 'BuddyListCtrl' })
            .when('/chapter/:chapterId', { templateUrl: 'views/stage-list.html',     controller: 'StageListCtrl' })
            .when('/chapters',         { templateUrl: 'views/chapter-list.html',     controller: 'ChapterListCtrl' })
            .when('/character-drop',   { templateUrl: 'views/character-drop.html',   controller: 'CharacterDropCtrl' })
            .when('/character-drops',  { templateUrl: 'views/character-drop-list.html', controller: 'CharacterDropListCtrl' })
            .when('/characters',       { templateUrl: 'views/character-list.html',   controller: 'CharacterListCtrl' })
            .when('/characters/eidolon', { templateUrl: 'views/eidolon-list.html',   controller: 'EidolonListCtrl' })
            .when('/cps',              { templateUrl: 'views/cps-list.html',         controller: 'CpsListCtrl' })
            .when('/daily-bonus',      { templateUrl: 'views/daily-bonus-list.html', controller: 'DailyBonusListCtrl' })
            .when('/disclaimer',       { templateUrl: 'views/disclaimer.html',       controller: 'DisclaimerCtrl' })
            .when('/drops',            { templateUrl: 'views/drop-list.html',        controller: 'DropListCtrl' })
            .when('/explore',          { templateUrl: 'views/explore-list.html',     controller: 'ExploreListCtrl' })
            .when('/explore/buddies',  { templateUrl: 'views/explore-buddy-list.html', controller: 'ExploreBuddyListCtrl' })
            .when('/explore/buddy/:ref', { templateUrl: 'views/explore-buddy-detail.html', controller: 'ExploreBuddyDetailCtrl' })
            .when('/explore/buddy-tharos', { templateUrl: 'views/explore-buddy-tharos.html', controller: 'ExploreBuddyTharosCtrl' })
            .when('/explore/character/:ref', { templateUrl: 'views/explore-character-detail.html', controller: 'ExploreCharacterDetailCtrl' })
            .when('/explore/characters', { templateUrl: 'views/explore-character-list.html', controller: 'ExploreCharacterListCtrl' })
            .when('/explore/skill/:ref', { templateUrl: 'views/explore-skill-detail.html', controller: 'ExploreSkillDetailCtrl' })
            .when('/explore/rebirths', { templateUrl: 'views/explore-rebirth-list.html', controller: 'ExploreRebirthListCtrl' })
            .when('/explore/rebirth/:src/:dst', { templateUrl: 'views/explore-rebirth-detail.html', controller: 'ExploreRebirthDetailCtrl' })
            .when('/explore/skills',   { templateUrl: 'views/explore-skill-list.html', controller: 'ExploreSkillListCtrl' })
            .when('/help',             {
                templateUrl: function(){
                    var locale = angular.isDefined(localStorage.locale) ? angular.fromJson(localStorage.locale): 'en';
                    return 'views/help-' + locale + '.html';
                }
            })
            .when('/history-import',   { templateUrl: 'views/history-import.html',   controller: 'HistoryImportCtrl' })
            .when('/history',          { 
                redirectTo: function(){
                    var today = new Date();
                    var m = today.getMonth() + 1; 
                    if(m < 10){ m = '0' + m.toString(); }
                    return '/history/:year-:month'.replace(':year', today.getFullYear()).replace(':month', m);
                } 
            })
            .when('/history/:year_month',  { templateUrl: 'views/history-list.html',     controller: 'HistoryListCtrl' })
            .when('/history/:from/:to',  { templateUrl: 'views/history-list.html',     controller: 'HistoryListCtrl' })
            .when('/item-character-detail', { templateUrl: 'views/item-character-detail.html', controller: 'ItemCharacterDetailCtrl' })
            .when('/item-drop',        { templateUrl: 'views/item-drop.html',        controller: 'ItemDropCtrl' })
            .when('/item-drops',       { templateUrl: 'views/item-drop-list.html',   controller: 'ItemDropListCtrl' })
            .when('/items',            { templateUrl: 'views/item-list.html',        controller: 'ItemListCtrl' })
            .when('/jobs',             { templateUrl: 'views/job-list.html',         controller: 'JobListCtrl' })
            .when('/login',            { templateUrl: 'views/login.html',            controller: 'LoginCtrl' })
            .when('/mz',               { templateUrl: 'views/mz-list.html',          controller: 'MzListCtrl' })
            .when('/mz-edit',          { templateUrl: 'views/mz-edit.html',          controller: 'MzEditCtrl' })
            .when('/one-team',         { templateUrl: 'views/one-team.html',         controller: 'OneTeamCtrl' })
            .when('/quick-start',      { templateUrl: 'views/quick-start.html',      controller: 'QuickStartCtrl' })
            .when('/quick_stats',      { templateUrl: 'views/quick-start.html',      controller: 'QuickStartCtrl' })
            .when('/settings',         { templateUrl: 'views/settings.html',         controller: 'SettingsCtrl' })
            .when('/skill-boost',      { templateUrl: 'views/skill-boost-list.html', controller: 'SkillBoostListCtrl' })
            .when('/skill-boost/:ref', { templateUrl: 'views/skill-boost-detail.html', controller: 'SkillBoostDetailCtrl' })
            .when('/skill-list',       { templateUrl: 'views/skill-list.html',       controller: 'SkillListCtrl' })
            .when('/stage-char-drop',  { templateUrl: 'views/stage-char-drop.html',  controller: 'StageCharDropCtrl' })
            .when('/stage-drop',       { templateUrl: 'views/stage-drop.html',       controller: 'StageDropCtrl' })
            .when('/stage-edit',       { templateUrl: 'views/stage-edit.html',       controller: 'StageEditCtrl' })
            .when('/stages',           { templateUrl: 'views/stage-list.html',       controller: 'StageListCtrl' })
            .when('/timezone',         { templateUrl: 'views/timezone-list.html',    controller: 'TimezoneListCtrl' })
            .when('/user-data-import', { templateUrl: 'views/user-data-import.html', controller: 'UserDataImportCtrl' })
            .when('/xp',               { templateUrl: 'views/xp-list.html',          controller: 'XpListCtrl' })
            .when('/xp/:level_ref',    { templateUrl: 'views/xp-list.html',          controller: 'XpListCtrl' })
            .when('/schedule',         { templateUrl: 'views/schedule.html',         controller: 'ScheduleCtrl' })
            .when('/stage-layout/:chapter/:stage', {
                templateUrl: 'views/stage-layout.html',
                controller: 'StageLayoutCtrl'
            })
            .when('/explore/buddies-evolution', {
              templateUrl: 'views/explore-buddies-evolution-list.html',
              controller: 'ExploreBuddiesEvolutionListCtrl'
            })
            .when('/explore/buddy-evolution/:from/:to', {
              templateUrl: 'views/explore-buddies-evolution-detail.html',
              controller: 'ExploreBuddiesEvolutionDetailCtrl'
            })
            .when('/explore/buddies-graph', {
              templateUrl: 'views/explore-buddy-evolution-graph.html',
              controller: 'ExploreBuddyEvolutionGraphCtrl'
            })
            .when('/buddy-drops', {
              templateUrl: 'views/buddy-drop-list.html',
              controller: 'BuddyDropListCtrl'
            })
            .when('/official-events', { templateUrl: 'views/tb-event-list.html', controller: 'TbEventListCtrl' })
            .otherwise({ redirectTo: '/quick-start' });
    }).config(function($tooltipProvider){
        $tooltipProvider.options({ animation: false });
    }).config(function(reCAPTCHAProvider){
        reCAPTCHAProvider.setPublicKey('6Le6kwETAAAAAFig5UJ7IlKKkVMYng1E50igqrWC');
        reCAPTCHAProvider.setOptions({
            theme: 'white'
        });
    }).run(function(gettextCatalog, $window){
        if($window.location.origin.match(/localhost/)){
            gettextCatalog.debug = true;
        }
    });

/* jQuery */
jQuery(document).ready(function(){
    /* WINDOW WIDTH */
    var $window = jQuery(window);
    function checkWidth(){
        if($window.width() < 992){
            jQuery('#main').removeClass('container').addClass('container-fluid');
        } else {
            jQuery('#main').removeClass('container-fluid').addClass('container');
        }
    }
    checkWidth();
    jQuery(window).resize(checkWidth);
    
    /* NAVBAR LINKS */
   /*$(document).on('click','.navbar-collapse.in', function(el) {
        console.log(el);
        if( $(el.target).is('a') ) {
            $(this).collapse('hide');
        }
    });*/
});

