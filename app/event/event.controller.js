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
    EventCtrl.$inject = ['EventService','$state','CategoryService','$stateParams','WishlistService'];



    /* @ngInject */
    function config ($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('event',{
                url:'/events',
                templateUrl:'event/views/ListEvent.html',
                controller: 'EventCtrl as event',
                cache:false
            })
            .state('event-detail',{
                url:'/events/detail/:eventId',
                templateUrl:'event/views/event-detail.view.html',
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
    function EventCtrl(EventService,$state,CategoryService,$stateParams,WishlistService) {
        //On Init Start
        var vm = this;
        vm.title = 'Event List';

        vm.getEvents = function () {
            console.log(EventService.getAllEvents());
            EventService.getAllEvents().then(function (data) {
                vm.events = data;
            });

        };

        vm.getCategories = function () {
            CategoryService.getAllCategories().then(function (data) {
                vm.categories = data;
                vm.categories.forEach(function (ca) {
                    console.log("categories",ca);

                })
            });

        }


        vm.eventId = $stateParams.eventId;
        vm.userConnectedId = 1;

        if(vm.eventId){
            // console.log(eventId);
            EventService.getEventByID(vm.eventId).then(function (data) {
                vm.eventToDisplay = data;
                // console.log(vm.eventToDisplay);
                // console.log(vm.eventToDisplay.latitude,vm.eventToDisplay.longitude);

                EventService.getAddress(vm.eventToDisplay.latitude,vm.eventToDisplay.longitude).then(function (data) {
                    // console.log('adress',data.data.results[0]);
                    vm.adress = data.data.results[0].formatted_address ;
                },function (err) {
                    console.log('error',err);
                })
            })
        }




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
        };
        // vm.loveIt=false;

        vm.giveHeart = function () {
            // vm.eventToDisplay.nbViews  = vm.eventToDisplay.nbViews + 1;
            // console.log(vm.eventToDisplay.nbViews);
            vm.loveIt = !vm.loveIt;

            if(vm.loveIt){
                vm.eventToDisplay.nbViews  = vm.eventToDisplay.nbViews + 1;

            }
            else {
                vm.eventToDisplay.nbViews  = vm.eventToDisplay.nbViews - 1;

            }
             // console.log(vm.eventToDisplay.nbViews);

            EventService.updateEvent(vm.eventToDisplay);
        };


        //VerifyWishlist
            WishlistService.getWishlistsByUserAndEvent(vm.userConnectedId,vm.eventId).then(function (data) {
                if(data.wishlistPK){
                    console.log('wishlist',data);
                    vm.addedWishlist=true;

                }
            });


        vm.addWishlist = function () {
            console.log('eventId',vm.eventId)
            console.log('userId',vm.userConnectedId);

            vm.addedWishlist = ! vm.addedWishlist;


            if(vm.addedWishlist){
                WishlistService.addToWishlist(vm.userConnectedId,vm.eventId);
            }
            else {
                WishlistService.removeFromWishlist(vm.userConnectedId,vm.eventId);

            }
        }
        

        vm.update = function (event) {
            EventService.updateEvent(event);

        };


        vm.delete = function (event,index) {
            EventService.deleteEvent(event).then(function (){
                vm.getEvents();
            });

        };

        //I could get the event directly from the list , but i re-used the factory and the service to test "get" function
        vm.details = function (idEvent) {
            vm.selectedEvent = EventService.getEventByID(idEvent);
        };


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

