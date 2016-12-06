(function () {
    'use strict';

    angular
        .module('EventifyApp.event',[
            'ui.router',

        ])
        .config(config)
        .controller('EventCtrl', EventCtrl);


    config.$inject = ['$stateProvider','$urlRouterProvider'];
    EventCtrl.$inject = ['EventFactory','$state'];



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
                controller: 'EventCtrl as eventCreate'
            })
        ;

    };

    /* @ngInject */
    function EventCtrl(EventFactory,$state) {
        var vm = this;
        vm.title = 'Event List';
        vm.events = EventFactory.query();
        console.log(vm.events);

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


        // I Choose some attributs Not-Null ,, i will change it later , THIS IS Just an example
        vm.event = {
            title:'',
            theme:'',
            placeNumber: 0,
            latitude :12,
            longitude:12,
            nbViews:1000,
            createdAt:new Date(),
            organization:{
                id:1
            },
            category:{
                id:1
            }
        }


        vm.add = function () {
             EventFactory.save(null,vm.event);
            vm.events = EventFactory.query();
            console.log(vm.event);
            $state.go('event');

        }




    };

})();

