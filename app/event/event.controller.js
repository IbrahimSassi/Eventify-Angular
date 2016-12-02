(function () {
    'use strict';

    angular
        .module('EventifyApp.event',[
            'ui.router',

        ])
        .config(config)
        .controller('EventCtrl', EventCtrl);


    config.$inject = ['$stateProvider','$urlRouterProvider'];
    EventCtrl.$inject = ['EventFactory'];



    /* @ngInject */
    function config ($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('event',{
                url:'/events',
                templateUrl:'event/ListEvent.html',
                controller: 'EventCtrl as event'
            })
            .state('newEvent',{
                url:'/events/new',
                templateUrl:'event/CreateEvent.html',
                controller: 'EventCreateCtrl as eventCreate'
            })
        ;

    };

    /* @ngInject */
    function EventCtrl(EventFactory) {
        var vm = this;
        vm.title = 'Event List';
        vm.events = EventFactory.query();
        //console.log(vm.events);

        vm.update = function (event) {
            console.log("updated");
            event.$update();
        }


        vm.delete = function (event,index) {
            event.$delete(function () {
                vm.events = EventFactory.query();
            });
            // console.log(vm.events);
            // console.log(index);
            // vm.events.slice(index,1);
            console.log(vm.events);
            console.log("deleted");

        }


    };

})();

