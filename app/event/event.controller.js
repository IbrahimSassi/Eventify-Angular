(function () {
    'use strict';

    angular
        .module('EventifyApp.event',[
            'ui.router',
            'ngAnimate',
            'ngCookies',
            'EventifyApp.eventFactory'

        ])
        .config(config)
        .controller('EventCtrl', EventCtrl);


    config.$inject = ['$stateProvider','$urlRouterProvider'];
    EventCtrl.$inject = ['EventFactory'];



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
    function EventCtrl(EventFactory) {
        var vm = this;
        vm.title = 'Event List';
        vm.posts = EventFactory.query();
        console.log(vm.posts);

    };

})();

