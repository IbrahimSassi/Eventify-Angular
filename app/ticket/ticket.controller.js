/**
 * Created by mrfirases on 12/10/2016.
 */
(function () {
    'use strict';

    /**My Module init**/
    angular
        .module('EventifyApp.ticket', [
            'ui.router','monospaced.qrcode'
        ])
        .config(config)
        .controller('TicketCtrl', TicketCtrl);
    /**End My Module Init**/

    /**Injection**/
    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    TicketCtrl.$inject = ['TicketService', '$state', '$scope', '$timeout','$rootScope','$window',"$stateParams"];
    /**End Of Injection**/


    /** Route Config **/
    function config($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('addTickets', {
                url: '/tickets/:idEvent',
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
    function TicketCtrl(TicketService, $state, $scope, $timeout,$rootScope,$window,$stateParams) {


        var vm = this;

        /**GET EVENT BY ID*/
        TicketService.getTicketByID(1).$promise.then(function (data) {
            console.log("haha", data);


        });
        /**END GET EVENT BY ID*/


        /**Store Real Ticket Numbers*/

        TicketService.getEventTickets(1).then(function (data) {
            vm.realtickets = data;
        });
        /**END Store Ticket Numbers*/


var totals=0;
var sales;
var salesCount=0;

        /** Update Ticket Numbers */
        vm.updatehahi = function () {
            TicketService.getEventTickets(1).then(function (data) {
                vm.ticketss = data;
                // vm.data = vm.events.slice(0, 3);





                vm.ticketss.forEach(function (ticket) {
                    console.log("ti ahaya mrigla:",ticket);
                    if( ((ticket.nbTickets - parseInt(vm.ticketnumber[ticket.id]))>0) || ((ticket.nbTickets - parseInt(vm.ticketnumber[ticket.id]))==0))
                    {
                        $state.go('reservateForEvent', {eventIDD: 1,tickets:vm.realtickets});

                    ticket.nbTickets = ticket.nbTickets - parseInt(vm.ticketnumber[ticket.id]);

                    TicketService.updateNbTicket(ticket);


                         totals =  totals+((parseInt(vm.ticketnumber[ticket.id]))*ticket.priceTicket);
                    console.log("totale: ",totals);

                   sales = {

                        total:totals,


                    }


                    sessionStorage.sales = angular.toJson(sales);

                    }
                    else{
                        console.log("waywaaaa");
                    }


                });

            });



        };
        /**END Update Ticket Numbers */


        /**Navigation And Update Ticket Numbers*/
        vm.goToBooking = function () {
            /*TODO Add event id*/
         //$state.go('reservateForEvent', {eventIDD: 1});


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

            event: {id: $stateParams.idEvent},


        }






        /**List Tickets**/
        vm.getEventTickets = function () {
            console.log("called", TicketService.getEventTickets(1));
            TicketService.getEventTickets(1).then(function (data) {
                console.log("Tickets: ", data);
                vm.tickets = data;
            });
        }








    };

    /**End UserCtrlFunction**/


})();



