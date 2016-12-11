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
        'EventifyApp.ticket',
        'EventifyApp.transaction',
        'EventifyApp.customForm',
        'ngResource'

    ])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');

    }])
    .run(function ($rootScope, $state, UserService) {
        $rootScope.$on("$stateChangeStart", function (event, toState) {
            if (toState.authenticate && !UserService.isAuth()) {
                $rootScope.currentUser = null;

                $state.transitionTo("loginUser");
                event.preventDefault();
            }
            else if (!UserService.isAuth()) {
                $rootScope.currentUser = null;
            }
            else {
                $rootScope.currentUser = UserService.extractTokenData(UserService.getToken());
                $rootScope.logMeOut= function(){
                    UserService.logout();
                    $state.reload();
                }
            }
        });
    });