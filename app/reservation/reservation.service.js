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






    }


})();

