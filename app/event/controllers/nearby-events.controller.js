/**
 * Created by Ibrahim on 25/12/2016.
 */
(function () {
    'use strict';

    angular
        .module('EventifyApp.event')
        .controller('NearbyCtrl', NearbyCtrl);


    NearbyCtrl.$inject = [
        'EventService',
        '$state',
        '$stateParams',
        '$geolocation',
    ];


    /* @ngInject */
    function NearbyCtrl(EventService,
                        $state,
                        $stateParams,
                        $geolocation) {
        //On Init Start
        var vm = this;
        vm.title = 'Event List';


        // Nearby Events Start **/

        vm.getGeoLocation = function () {
            $geolocation.getCurrentPosition({
                timeout: 60000
            }).then(function (position) {

                console.log(position);
                vm.myPosition = position;


                //Real one
                // EventService.getNearbyEvents(vm.myPosition.coords.longitude,vm.myPosition.coords.latitude).then(function (data) {
                //     console.log('data',data);
                //     vm.nearByEvents = data;
                // });

                //For Test
                EventService.getNearbyEvents(10.588536, 36.89509509999999).then(function (data) {
                    console.log('data', data);
                    vm.nearByEvents = data;
                });


            });


        };
        // Nearby Events End **/


        vm.initEventMap = function () {

            EventService.getAllEvents().then(function (data) {

                vm.events = data;
                vm.initMap();

            });


        }


        vm.initMap = function () {


            var mapOptions = {
                center: new google.maps.LatLng(34.846046, 10.183385),
                zoom: 7
            };


            var map = new google.maps.Map(document.getElementById('fullscreen-map'),
                mapOptions);



            vm.events.forEach(function (event) {

                var imgBack = event.backgroundImage
                var myLatlng = new google.maps.LatLng(event.latitude,event.longitude);
                var infowindow = new google.maps.InfoWindow({
                    content : "<div>" +
                    event.title+ "<br>" +
                    event.theme+ "<br>" +
                    "<img src='imgBack' alt=''>"+ "<br>" +
                    "</div>"
                });


                var marker = new google.maps.Marker({
                    // draggable: true,
                    map: map,
                    position: myLatlng,
                    animation: google.maps.Animation.DROP,
                    icon :"assets/img/map-marker-green.png"

                });
                marker.addListener('click', function() {
                    infowindow.open(map, marker);
                });



            })


        };


    };

})();

