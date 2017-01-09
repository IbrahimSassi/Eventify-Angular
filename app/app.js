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
        'EventifyApp.organization',
        'EventifyApp.comments',
        'EventifyApp.bank',
        'EventifyApp.task',
        'EventifyApp.discussion',
        'angularMoment',
        'ngResource'
        'EventifyApp.organizer',
        'EventifyApp.rates',
        'EventifyApp.referrel',
        'ngResource',


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

                //$rootScope.currentUser = UserService.extractTokenData(UserService.getToken());
                $rootScope.currentUser.User = UserService.getUserByID($rootScope.currentUser.User.id);
                $rootScope.logMeOut= function(){
                    UserService.logout();
                    $state.reload();
                }
            }
        });
    });