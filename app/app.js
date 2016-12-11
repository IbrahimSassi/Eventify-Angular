'use strict';

// Declare app level module which depends on views, and components
angular
    .module('EventifyApp', [
        'EventifyApp.home',
        'EventifyApp.dashboard',
        'EventifyApp.category',
        'EventifyApp.wishlist',
        'EventifyApp.event',
        'EventifyApp.user',
        'EventifyApp.reservation',
        'EventifyApp.customForm',
        'ngResource'

    ])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');

    }]);
