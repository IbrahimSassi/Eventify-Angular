'use strict';

// Declare app level module which depends on views, and components
angular
    .module('EventifyApp', [
        'EventifyApp.home',
        'EventifyApp.dashboard',
        'EventifyApp.category',
        'EventifyApp.event',
        'EventifyApp.user',
        'EventifyApp.customForm',
        'ngResource'

    ])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');

    }]);
