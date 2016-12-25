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


    };

})();

