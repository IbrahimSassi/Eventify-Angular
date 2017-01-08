(function () {
    'use strict';

    angular
        .module('EventifyApp.event', [
            'ui.router',
            'ui.bootstrap',
            'ui.bootstrap.datetimepicker',
            'ui-rangeSlider',
            'angular-loading-bar',
            'ngAnimate',
            'ngTouch',
            // 'angular-carousel',
            // 'infinite-scroll',
            'ngGeolocation'
        ])
        .config(config)
        .controller('EventCtrl', EventCtrl);


    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    EventCtrl.$inject = [
        'EventService',
        '$state',
        'CategoryService',
        '$stateParams',
        'WishlistService',
        'VoiceToTextService',
        '$scope'
    ];


    /* @ngInject */
    function config($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('events', {
                url: '/events/all',
                templateUrl: 'event/views/listing-events.view.html',
                controller: 'EventCtrl as event',
                cache: false
            })
            .state('events-with-maps', {
                url: '/events/maps',
                templateUrl: 'event/views/event-listing-map.view.html',
                controller: 'NearbyCtrl as event',
                cache: false
            })
            .state('events-timeline', {
                url: '/events/timeline',
                templateUrl: 'event/views/event-timeline.view.html',
                controller: 'EventCtrl as event',
                cache: false
            })
            .state('events-nearby', {
                url: '/events/nearby',
                templateUrl: 'event/views/nearby-events.view.html',
                controller: 'NearbyCtrl as event',
                cache: false
            })
            .state('event-detail', {
                url: '/events/detail/:eventId',
                templateUrl: 'event/views/event-detail.view.html',
                controller: 'DetailEvent as event',
                cache: false
            })
            .state('newEvent', {
                url: '/events/new',
                templateUrl: 'event/views/CreateEvent.html',
                controller: 'CreateEventCtrl as eventCreate'
            })
        ;

    };

    /* @ngInject */
    function EventCtrl(EventService,
                       $state,
                       CategoryService,
                       $stateParams,
                       WishlistService,
                       VoiceToTextService,
                       $scope) {
        //On Init Start
        var vm = this;
        vm.title = 'Event List';
        vm.search = {
            eventType : ""
        }

        // ** Init start **//


        Object.defineProperty(EventCtrl.prototype,
            "search.eventType", {
                get: function () {
                    return this.search.eventType;
                },
                set: function (newValue) {
                    this.search.eventType = newValue;

                    //Call method on update
                    // this.onSelectedItemChange(this._selectedItem);
                },
                enumerable: true,
                configurable: true
            });


        vm.initListing = function () {
            vm.getEvents();
            vm.getCategories();
        };

        // ** Init end **//


        //** Shared start **/

        // Getting Categories to list them in the listbox
        vm.getCategories = function () {
            CategoryService.getAllCategories().then(function (data) {
                vm.categories = data;
                // vm.categories.forEach(function (ca) {
                //     // console.log("categories", ca);
                //
                // })
            });
        };


        vm.getRateForEvent = function (id) {
            return EventService.getMyRate(id);
        };

        //** Shared end **/


        // ** Event Listing start **//


        //Getting All Events
        vm.getEvents = function () {
            EventService.getAllEvents().then(function (data) {
                vm.events = data;

                // vm.data = vm.events.slice(0, 3);

                vm.events.forEach(function (event) {

                    //getRate for each event and set it
                    vm.getRateForEvent(event.id).then(function (data) {
                        if (data.id)
                            event.rateAvg = Math.round(data.rateAvg);
                    });

                    EventService.getMyTickets(event.id).then(function (data) {
                        if (data.length > 0) {
                            // console.log('tickets before',data);

                            event.tickets = data;

                        }


                    });


                });
                console.log(vm.events);

            });

        };


        $scope.$watch(function () {
                return vm.search.eventType;
            }, function (newValue, oldValue) {
                console.log("old value",oldValue)
                console.log("new value",newValue)
            });


        vm.searchByVoiceBool = 0;
        vm.SearchByVoice = function (event) {

            vm.searchByVoiceBool = vm.searchByVoiceBool + 1;
            VoiceToTextService.startButton(event);

            if (vm.searchByVoiceBool % 2 == 0) {

                var text = VoiceToTextService.getText();
                console.log('speech' + text);

                EventService.searchWithVoice(text).then(function (data) {
                    console.log('result wit' + data.entities.search_query[0].value);

                    // vm.search= data.entities.search_query[0].value;

                    if ((data.entities.search_query[0].value == "conference") || (data.entities.search_query[0].value == "Conference")) {
                        vm.search.eventType = "Conference";

                    }
                    else if ((data.entities.search_query[0].value === "Workshop") || (data.entities.search_query[0].value === "workshop")) {
                        vm.search.eventType = "Class_Workshop";

                    }
                    else if ((data.entities.search_query[0].value == "meeting") || (data.entities.search_query[0].value == "Meeting")) {
                        vm.search.eventType = "Meeting";

                    }
                    $scope.$apply();


                }, function (err) {
                    console.log('error', err);
                });


            }


        };


        //
        // vm.getMoreData = function () {
        //     vm.data = vm.events.slice(0, vm.data.length + 3);
        // }


        vm.filterByTicketPrice = function () {


            vm.eventsFiltred = [];
            vm.events.forEach(function (event) {
                var bool = false;

                if (event.tickets) {
                    event.tickets.forEach(function (ticket) {
                        console.log(ticket);
                        if ((ticket.priceTicket <= vm.range.max) && (ticket.priceTicket >= vm.range.min)) {
                            bool = true;
                        }

                    });
                }
                if (bool)
                    vm.eventsFiltred.push(event);


            });
            vm.events = vm.eventsFiltred;
            console.log(vm.eventsFiltred);

        };

        // ** Event Listing end **//


        vm.userConnectedId = 1;


        vm.giveHeart = function (event) {
            // vm.eventToDisplay.nbViews  = vm.eventToDisplay.nbViews + 1;
            // console.log(vm.eventToDisplay.nbViews);
            vm.loveIt = !vm.loveIt;

            if (vm.loveIt) {
                event.nbViews = event.nbViews + 1;

            }
            else {
                event.nbViews = event.nbViews - 1;

            }
            // console.log(vm.eventToDisplay.nbViews);

            EventService.updateEvent(event);
        };


        //VerifyWishlist
        WishlistService.getWishlistsByUserAndEvent(vm.userConnectedId, vm.eventId).then(function (data) {
            if (data.wishlistPK) {
                console.log('wishlist', data);
                vm.addedWishlist = true;

            }
        });


        vm.addWishlist = function () {
            console.log('eventId', vm.eventId)
            console.log('userId', vm.userConnectedId);

            vm.addedWishlist = !vm.addedWishlist;


            if (vm.addedWishlist) {
                WishlistService.addToWishlist(vm.userConnectedId, vm.eventId);
            }
            else {
                WishlistService.removeFromWishlist(vm.userConnectedId, vm.eventId);

            }
        };


        function roundDecimal(nombre, precision) {
            var precision = precision || 2;
            var tmp = Math.pow(10, precision);
            return Math.round(nombre * tmp) / tmp;
        }


        vm.getNumber = function (num) {
            return new Array(num);
        };


        /*** Ibra Pagination Module Start ***/


        vm.itemPerPage = 4;
        vm.start = 0;
        vm.end = vm.itemPerPage;

        vm.getPageNumber = function (num) {

            if (num) {
                try {
                    return new Array(num);

                } catch (e) {
                    return new Array(Math.ceil(num));

                }

            }
        };

        vm.nextPage = function () {

            if (vm.end <= vm.events.length - 1) {
                vm.start += vm.itemPerPage;
                vm.end += vm.itemPerPage;
            }
        };

        vm.prevPage = function () {
            if (vm.start <= vm.events.length && vm.start > 0) {
                vm.start = vm.start - vm.itemPerPage;
                vm.end = vm.end - vm.itemPerPage;
            }
        };


        vm.goToPage = function (index) {
            vm.start = vm.itemPerPage * index;
            vm.end = vm.start + vm.itemPerPage;
        };


        /*** Ibra Pagination Module End ***/










        vm.range = {
            min: 20,
            max: 80
        };


        //
        vm.initMap = function () {


            if (vm.eventId) {

                var mapOptions = {
                    center: new google.maps.LatLng(vm.eventToDisplay.latitude, vm.eventToDisplay.longitude),
                    zoom: 13
                };
                console.log("here", mapOptions)
            }
            else {
                var mapOptions = {
                    center: new google.maps.LatLng(-33.8688, 151.2195),
                    zoom: 13
                };

            }


            var map = new google.maps.Map(document.getElementById('map-canvas'),
                mapOptions);

            var input = /** @type {HTMLInputElement} */(
                document.getElementById('pac-input'));

            var types = document.getElementById('type-selector');
            map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
            map.controls[google.maps.ControlPosition.TOP_LEFT].push(types);

            var autocomplete = new google.maps.places.Autocomplete(input);
            autocomplete.bindTo('bounds', map);

            var infowindow = new google.maps.InfoWindow();
            var marker = new google.maps.Marker({
                draggable: true,
                map: map,
                anchorPoint: new google.maps.Point(0, -29)
            });

            google.maps.event.addListener(marker, "mouseup", function (event) {
                $('#input-latitude').val(this.position.lat());
                $('#input-longitude').val(this.position.lng());
            });

            google.maps.event.addListener(autocomplete, 'place_changed', function () {
                infowindow.close();
                marker.setVisible(false);
                var place = autocomplete.getPlace();
                if (!place.geometry) {
                    return;
                }

                // If the place has a geometry, then present it on a map.
                if (place.geometry.viewport) {
                    map.fitBounds(place.geometry.viewport);
                } else {
                    map.setCenter(place.geometry.location);
                    map.setZoom(17);
                }
                marker.setIcon(/** @type {google.maps.Icon} */({
                    url: place.icon,
                    size: new google.maps.Size(71, 71),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(35, 35)
                }));
                marker.setPosition(place.geometry.location);
                marker.setVisible(true);

                $('#input-latitude').val(place.geometry.location.lat());
                $('#input-longitude').val(place.geometry.location.lng());

                var address = '';
                if (place.address_components) {
                    address = [
                        (place.address_components[0] && place.address_components[0].short_name || ''),
                        (place.address_components[1] && place.address_components[1].short_name || ''),
                        (place.address_components[2] && place.address_components[2].short_name || '')
                    ].join(' ');
                }

                infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
                infowindow.open(map, marker);
            });
        };


    };

})();

