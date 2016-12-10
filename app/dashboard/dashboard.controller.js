
/**
 * Created by Ibrahim on 10/12/2016.
 */
(function () {
    'use strict';

    angular
        .module('EventifyApp.dashboard',[
            'ui.router',
        ])
        .config(config)
        .controller('DashboardCtrl', DashboardCtrl);

    config.$inject = ['$stateProvider','$urlRouterProvider'];

    /* @ngInject */
    function config ($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('administration',{
                url:'/administration',
                templateUrl:'dashboard/views/dashboard.view.html',
                controller: 'DashboardCtrl as dash',
                cache:false
            })
            .state('administration.home',{
                url:'/home',
                templateUrl:'dashboard/views/home.view.html',
                controller: 'DashboardCtrl as dash',
                cache:false,

            })
            .state('administration.events',{
                url:'/events',
                templateUrl:'dashboard/views/ListingMyEvents.view.html',
                controller: 'DashboardCtrl as dash',
                cache:false,

            })
        ;



        $urlRouterProvider.otherwise('/home');

    };

    DashboardCtrl.$inject = [];

    /* @ngInject */
    function DashboardCtrl() {
        var vm = this;
        vm.title = 'DashboardCtrl';


    }

})();

