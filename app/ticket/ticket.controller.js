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
    TicketCtrl.$inject = ['TicketService', '$state'];
    /**End Of Injection**/


    /** Route Config **/
    function config($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('listTickets', {
                url: '/tickets',
                templateUrl: '../ticket/views/listTickets.html',
                controller: 'TicketCtrl as ticket'
            })


        ;

    };
    /**End of Route Config**/

    /** Controller UseCtrl FUNCTION
     *
     * @param UserService
     * @param $state
     */
    function TicketCtrl(TicketService, $state) {


        var vm = this;


        /**List Tickets**/
        vm.ticketsList = function () {
            console.log("called",TicketService.getAllTickets());
            TicketService.getAllTickets().then(function (data) {
                console.log("data",data);
                vm.tickets = data;
            });
        }



    };

    /**End UserCtrlFunction**/

})();
/**
 * Created by moham on 12/10/2016.
 */
