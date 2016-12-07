(function () {
    'use strict';

    angular
        .module('EventifyApp.event',[
            'ui.router',

        ])
        .config(config)
        .controller('EventCtrl', EventCtrl);


    config.$inject = ['$stateProvider','$urlRouterProvider'];
    EventCtrl.$inject = ['EventService','$state'];



    /* @ngInject */
    function config ($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('event',{
                url:'/events',
                templateUrl:'event/ListEvent.html',
                controller: 'EventCtrl as event',
                cache:false
            })
            .state('newEvent',{
                url:'/events/new',
                templateUrl:'event/CreateEvent.html',
                controller: 'EventCtrl as eventCreate'
            })
        ;

    };

    /* @ngInject */
    function EventCtrl(EventService,$state) {
        var vm = this;
        vm.title = 'Event List';

        vm.getEvents = function () {
            EventService.getAllEvents().then(function (data) {
                vm.events = data;
            });

        }

        vm.add = function () {
            EventService.addEvent(vm.event).then(function (){
                vm.getEvents();
                $state.go('event');
            });


        }


        vm.update = function (event) {
            EventService.updateEvent(event);
            console.log("Updated");

        }


        vm.delete = function (event,index) {
            EventService.deleteEvent(event).then(function (){
                vm.getEvents();
            });


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






    };

})();

