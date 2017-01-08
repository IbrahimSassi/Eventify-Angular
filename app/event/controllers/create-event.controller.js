/**
 * Created by Ibrahim on 25/12/2016.
 */
(function () {
    'use strict';

    angular
        .module('EventifyApp.event')
        .controller('CreateEventCtrl', CreateEventCtrl);


    CreateEventCtrl.$inject = [
        'EventService',
        '$state',
        'CategoryService',
        '$stateParams',
        'WishlistService',
        '$geolocation',
    ];

    function CreateEventCtrl(EventService,
                             $state,
                             CategoryService) {
        //On Init Start
        var vm = this;
        vm.title = 'Event List';


        // ** Init start **//
        vm.initCreate = function () {
            vm.getCategories();
            vm.initMap();
        };

        // ** Init end **//



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


        // ** Create Event start **/


        // DateTime Picker Initiation
        vm.datetimepickerStart = {
            date: new Date()
        };
        vm.datetimepickerEnd = {
            date: new Date()
        };

        vm.openCalendar = function (e, datetimepicker) {
            // e.preventDefault();
            // e.stopPropagation();

            vm[datetimepicker].open = true;
        };


        vm.add = function () {

            vm.event.organization = { id : 1};
            vm.event.createdAt = new Date();

            EventService.addEvent(vm.event).then(function (data) {
                vm.getEvents();
                console.log(vm.events)
                $state.go('addTickets',{"idEvent":vm.events[vm.events.length-1].id});

            });
        };

        // ** Create Event end **/


        vm.getNumber = function (num) {
            return new Array(num);
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

