/**
 * Created by mrfirases on 12/10/2016.
 */
(function () {
    'use strict';

    angular
        .module('EventifyApp.ticket')
        .service('TicketService', TicketServiceFN);

    TicketServiceFN.$inject = ['TicketFactory', '$filter'];


    function TicketServiceFN(TicketFactory, $filter) {

        this.getAllTickets = function () {
            return TicketFactory.query().$promise;
        };






    }


})();

/**
 * Created by moham on 12/10/2016.
 */