/**
 * Created by mrfirases on 12/10/2016.
 */
(function () {
    'use strict';

    /**My Module init**/
    angular
        .module('EventifyApp.ticket', [
            'ui.router',
        ])
        .config(config)
        .controller('TicketCtrl', TicketCtrl);
    /**End My Module Init**/

    /**Injection**/
    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    TicketCtrl.$inject = ['TicketService', '$state', '$scope', '$timeout'];
    /**End Of Injection**/


    /** Route Config **/
    function config($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('addTickets', {
                url: '/tickets',
                templateUrl: 'ticket/views/addTicket.html',
                controller: 'TicketCtrl as createTicket'
            })

            .state('selectTickets', {
                url: '/mytickets',
                templateUrl: 'ticket/views/selectTickets.html',
                controller: 'TicketCtrl as selectTicket'
            })


        ;

    };
    /**End of Route Config**/

    /** Controller UseCtrl FUNCTION
     *
     * @param UserService
     * @param $state
     */
    function TicketCtrl(TicketService, $state, $scope, $timeout) {


        var vm = this;


        /**GET EVENT BY ID*/
        TicketService.getTicketByID(1).$promise.then(function (data) {
            console.log("haha", data);


        });
        /**END GET EVENT BY ID*/


        /** Update Ticket Numbers */
        vm.updatehahi = function () {
            TicketService.getEventTickets(1).then(function (data) {
                vm.ticketss = data;
                // vm.data = vm.events.slice(0, 3);

                vm.ticketss.forEach(function (ticket) {
                    console.log("ti ahaya mrigla:",ticket);

                    ticket.nbTickets = ticket.nbTickets - parseInt(vm.ticketnumber[ticket.id]);

                    TicketService.updateNbTicket(ticket);


                });


            });


        };
        /**END Update Ticket Numbers */


        /**Navigation And Update Ticket Numbers*/
        vm.goToBooking = function () {
            /*TODO Add event id*/
            $state.go('reservateForEvent', {eventIDD: 1});


        };


        /**Add multi items**/
        $scope.items = [];
        var i = 0;
        $scope.add = function () {
            i++;
            $scope.items.push({
                type: "createTicket.ticket" + ".typeTicket",
                description: "createTicket.ticket" + ".description",
                number: "createTicket.ticket" + ".nbTickets",
                price: "createTicket.ticket" + ".priceTicket",
                block: "false",
                i: i,

            });
        };


        /**Chnage Fieldset to disabled*/
        vm.setAttr = function () {
            var myEl = angular.element(document.querySelector('typeinput' + i));
            var el = document.getElementById("fid" + i);

            el.setAttribute('disabled', "true");
            // el.setAttribute('style',"display:none;");


        }


        /**Add New Tickets**/
        vm.add = function () {

            TicketService.addTicket(vm.ticket).then(function () {

                    console.log(vm.ticket);
                    vm.ticketsList();

                    $state.go('ticket');

                }
            );
        };

        /*TODO Add event id*/
        /**Adding ticket id*/
        vm.ticket = {
            backgroundImage: "",

            event: {id: 1},


        }


        /**List Tickets**/
        vm.getEventTickets = function () {
            console.log("called", TicketService.getEventTickets(1));
            TicketService.getEventTickets(1).then(function (data) {
                console.log("Ticket: ", data);
                vm.tickets = data;
            });
        }


    };

    /**End UserCtrlFunction**/


})();



