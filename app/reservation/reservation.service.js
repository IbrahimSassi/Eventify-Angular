/**
 * Created by mrfirases on 12/7/2016.
 */
(function () {
    'use strict';

    angular
        .module('EventifyApp.reservation')
        .service('ReservationService', ReservationServiceFN);

    ReservationServiceFN.$inject = ['ReservationFactory', '$filter'];


    function ReservationServiceFN(ReservationFactory, $filter) {

        this.getAllReservations = function () {
             return ReservationFactory.query().$promise;
        };

       this.addReservation =  function (reservation) {
           console.log(reservation);

            return ReservationFactory.save(reservation).$promise;
        }

        this.CountReservations = function () {








           var cnt;
            var reser= ReservationFactory.query();
            reser.forEach(function (reser) {
cnt++;
                $scope.cnt=vm.cnt;
                console.log("zeeeeeeeeeb");

            });
            return cnt; };


    }


})();

