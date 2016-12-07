'use strict';

// Declare app level module which depends on views, and components
angular
    .module('EventifyApp', [
        'EventifyApp.event',
        'EventifyApp.user',
        'ngResource',

    ])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/users');

    }]);
