(function () {
    'use strict';

    angular
        .module('EventifyApp.event',[
            'ui.router',
            'ngResource',
            'ngAnimate',
            'ngCookies'

        ])
        .config(config)
        .controller('EventCtrl', EventCtrl);


    config.$inject = ['$stateProvider','$urlRouterProvider'];
    EventCtrl.$inject = [];



    /* @ngInject */
    function config ($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('home',{
                url:'/',
                templateUrl:'event/event.html',
                controller: 'EventCtrl as event'
            })


        ;

    };

    /* @ngInject */
    function EventCtrl() {
        var vm = this;
        console.log(vm);
        vm.title = 'Event List';

    };

})();

