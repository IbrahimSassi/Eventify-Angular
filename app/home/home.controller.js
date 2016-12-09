/**
 * Created by Ibrahim on 09/12/2016.
 */

(function () {
    'use strict';

    angular
        .module('EventifyApp.home',[
            'ui.router',


        ])
        .config(config)
        .controller('HomeCtrl', HomeCtrlFN);


    config.$inject = ['$stateProvider','$urlRouterProvider'];
    HomeCtrlFN.$inject = [];



    /* @ngInject */
    function config ($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('home',{
                url:'/home',
                templateUrl:'home/views/home.view.html',
                controller: 'HomeCtrl as home',
                cache:false
            })
        ;

    };

    /* @ngInject */
    function HomeCtrlFN() {
        var vm = this;
        vm.title = 'Home';


    };

})();

