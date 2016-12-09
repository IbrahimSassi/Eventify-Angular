(function () {
    'use strict';

    angular
        .module('EventifyApp.event',[
            'ui.router',
            'ui.bootstrap', 'ui.bootstrap.datetimepicker'
        ])
        .config(config)
        .controller('EventCtrl', EventCtrl);


    config.$inject = ['$stateProvider','$urlRouterProvider'];
    EventCtrl.$inject = ['EventService','$state','CategoryService'];



    /* @ngInject */
    function config ($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('event',{
                url:'/events',
                templateUrl:'event/views/ListEvent.html',
                controller: 'EventCtrl as event',
                cache:false
            })
            .state('newEvent',{
                url:'/events/new',
                templateUrl:'event/views/CreateEvent.html',
                controller: 'EventCtrl as eventCreate'
            })
        ;

    };

    /* @ngInject */
    function EventCtrl(EventService,$state,CategoryService) {
        //On Init Start
        var vm = this;
        vm.title = 'Event List';

        vm.getEvents = function () {
            console.log(EventService.getAllEvents());
            EventService.getAllEvents().then(function (data) {
                vm.events = data;
            });

        };


        CategoryService.getAllCategories().then(function (data) {
           vm.categories = data;
           // vm.categories.forEach(function (ca) {
           //     console.log("categories",ca);
           //
           // })
        });



        // this.isOpen = false;

        vm.datetimepicker = {
            date: new Date()
        };

        this.openCalendar = function(e,datetimepicker) {
            // e.preventDefault();
            // e.stopPropagation();

            vm[datetimepicker].open = true;
        };



        // On Init End

        vm.add = function () {
            EventService.addEvent(vm.event).then(function (){
                vm.getEvents();
                $state.go('event');
            });


        }


        vm.update = function (event) {
            EventService.updateEvent(event);

        }


        vm.delete = function (event,index) {
            EventService.deleteEvent(event).then(function (){
                vm.getEvents();
            });

        };

        //I could get the event directly from the list , but i re-used the factory and the service to test "get" function
        vm.details = function (idEvent) {
            vm.selectedEvent = EventService.getEventByID(idEvent);
        }


        // I Choose some attributs Not-Null ,, i will change it later , THIS IS Just an example
        vm.event = {
            eventState:"UNPUBLISHED",
            placeNumber: 0,
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

