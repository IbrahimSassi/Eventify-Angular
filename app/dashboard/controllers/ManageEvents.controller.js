/**
 * Created by Ibrahim on 10/12/2016.
 */

(function () {
    'use strict';

    angular
        .module('EventifyApp.dashboard')
        .controller('ManageEventsCtrl', ManageEventsCtrl);


    ManageEventsCtrl.$inject = ['EventService', '$stateParams', '$state','CategoryService'];

    /* @ngInject */
    function ManageEventsCtrl(EventService, $stateParams, $state,CategoryService) {
        var vm = this;
        vm.title = 'DashboardCtrl';
        vm.SelectedOrganization= 1;
        // console.log("salem From Manage Events")
        // console.log(MyEventsService.getMyEvents(1));

        var editedEventId = $stateParams.id;

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




        vm.getEditedEvent = function () {
            EventService.getEventByID(editedEventId).$promise.then(function (data) {
                console.log(data);
                vm.editedEvent = data;

                vm.editedEvent.startTime = new Date(vm.editedEvent.startTime);
                vm.editedEvent.endTime = new Date(vm.editedEvent.endTime);
                vm.initMap();

            })

        }

        vm.getMyEvents = function () {
            EventService.getEventsByOrganization(vm.SelectedOrganization).then(function (data) {
                vm.myEvents = data;

            });


        }


        vm.delete = function (event) {
            EventService.deleteEvent(event).then(function () {
                vm.getMyEvents();
            });
        };


        vm.update = function () {
            EventService.updateEvent(vm.editedEvent);
            $state.go('administration.events')
        };

        vm.unpublish = function (event) {
            event.eventState = "UNPUBLISHED";
            EventService.updateEvent(event);
        }

        vm.publish = function (event) {
            event.eventState = "PUBLISHED";
            EventService.updateEvent(event);

        }


        vm.getCategories = function () {
            CategoryService.getAllCategories().then(function (data) {
                vm.categories = data;
                vm.categories.forEach(function (ca) {
                    console.log("categories", ca);

                })
            });
        }


        vm.initEdit = function () {
            vm.getCategories();
            vm.getEditedEvent();
        }









        vm.initMap = function() {

            var mapOptions = {
                center: new google.maps.LatLng(vm.editedEvent.latitude, vm.editedEvent.longitude),
                zoom: 13
            };
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

            google.maps.event.addListener(marker, "mouseup", function(event) {
                $('#input-latitude').val(this.position.lat());
                $('#input-longitude').val(this.position.lng());
            });

            google.maps.event.addListener(autocomplete, 'place_changed', function() {
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
        }




    }

})();

