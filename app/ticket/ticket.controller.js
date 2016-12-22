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
    TicketCtrl.$inject = ['TicketService', '$state', '$scope'];
    /**End Of Injection**/


    /** Route Config **/
    function config($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('listTickets', {
                url: '/tickets',
                templateUrl: 'ticket/views/addTicket.html',
                controller: 'TicketCtrl as createTicket'
            })


        ;

    };
    /**End of Route Config**/

    /** Controller UseCtrl FUNCTION
     *
     * @param UserService
     * @param $state
     */
    function TicketCtrl(TicketService, $state, $scope) {


        var vm = this;


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

        /**Adding ticket id*/
        vm.ticket = {
            backgroundImage: "",

            event: {id: 1},


        }


        /**List Tickets**/
        vm.ticketsList = function () {
            console.log("called", TicketService.getAllTickets());
            TicketService.getAllTickets().then(function (data) {
                console.log("data", data);
                vm.tickets = data;
            });
        }


    };

    /**End UserCtrlFunction**/

})();
/**
 * Created by moham on 12/10/2016.
 */
