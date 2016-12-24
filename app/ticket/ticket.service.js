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

        this.getEventTickets = function (idEvent) {
            return TicketFactory.getTicketsByEvent({id: idEvent}).$promise;
        };


        this.addTicket =  function (ticket) {
            console.log(ticket);

            return TicketFactory.save(ticket).$promise;
        }


        this.updateNbTicket = function (ticket) {
            TicketFactory.update({id: ticket.id}, ticket);
            console.log("Updated");
        }



        this.getTicketByID = function (idTicket) {

            return TicketFactory.get({id: idTicket});
        }



    }


})();

/**
 * Created by moham on 12/10/2016.
 */
