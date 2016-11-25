(function () {
    'use strict';

    angular
        .module('EventifyApp.event',[
            'ui.router',
            'EventifyApp.eventFactory'

        ])
        .config(config)
        .controller('EventCtrl', EventCtrl);


    config.$inject = ['$stateProvider','$urlRouterProvider'];
    EventCtrl.$inject = ['EventFactory'];



    /* @ngInject */
    function config ($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('event',{
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
        vm.events = EventFactory.query();
        console.log(vm.events);

        vm.update = function (event) {
            console.log("updated");
            EventFactory.update(null,event);
        }


    };

})();

