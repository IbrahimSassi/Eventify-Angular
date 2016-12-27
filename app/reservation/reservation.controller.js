/**
 * Created by mrfirases on 12/7/2016.
 */
(function () {
    'use strict';

    /**My Module init**/
    var a = angular
        .module('EventifyApp.reservation', [
            'ui.router',
        ])
        .config(config)
        .controller('ReservationCtrl', ReservationCtrl);
    /**End My Module Init**/

    /**Injection**/
    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    ReservationCtrl.$inject = ['ReservationService', '$state', 'BankService', '$rootScope', '$scope', '$timeout', '$stateParams', 'TicketService','TransactionService'];
    /**End Of Injection**/


    /** Route Config **/
    function config($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('listReservations', {
                url: '/reservations',
                templateUrl: '../reservation/views/listReservations.html',
                controller: 'ReservationCtrl as reservation'
            })
            .state('reservateForEvent', {
                url: '/booking',
                templateUrl: '../reservation/views/eventBooking.html',
                controller: 'ReservationCtrl as createReservation',
                params: {
                    eventIDD: null,
                    tickets: null,
                }
            })

        ;

    };
    /**End of Route Config**/

    /** Controller UseCtrl FUNCTION
     *
     * @param UserService
     * @param $state
     */
    function ReservationCtrl(ReservationService, $state, BankService, $rootScope, $scope, $timeout, $stateParams, TicketService, TransactionService) {


        var vm = this;




            console.log("paypalctrl: ",  TransactionService.payReservation(1).id);


        //Initialising tickets value
        vm.ticketsToShow = $stateParams.tickets;
        vm.totals = angular.fromJson(sessionStorage.sales);
        //END init tickets value


        //TRYING TO SEVE IN LOCAL STORAGE
        var service = {

            model: {
                name: '',
                email: ''
            },

            SaveState: function () {
                sessionStorage.userService = angular.toJson(service.model);
            },

            RestoreState: function () {
                service.model = angular.fromJson(sessionStorage.userService);
            }
        }

        $rootScope.$on("savestate", service.SaveState);
        sessionStorage.userService = angular.toJson(service.model);
        console.log("Wiiiiw", angular.fromJson(sessionStorage.sales));
        //END TRYING TO SEVE IN LOCAL STORAGE


        /**Working with changing checkbox value*/
        var checkbox = false;
        vm.stateChanged = function () {
            if (checkbox == true) {
                checkbox = false;
            }
            else if (checkbox == false) {
                checkbox = true;
            }
            console.log("Payment checkbox value", checkbox);
            console.log($stateParams.eventIDD);
            console.log($stateParams.tickets);


        };
        /**END Working with changing checkbox value*/

        /**List Reservations**/
        vm.reservationsList = function () {
            console.log("called", ReservationService.getAllReservations());
            ReservationService.getAllReservations().then(function (data) {
                console.log("data", data);
                vm.reservations = data;
            });
        }


        /**Adding static values TODO **/

            vm.reservation = {

                reservationDate: new Date(),
                user: {id: $rootScope.currentUser.User.id},




            }

        /**END Adding static values TODO **/

        /** Adding Reservation **/
        vm.add = function () {
            if ($scope.counter != 0) {
                var bankResponse;
                /**FOR CREDIT CARD*/
                if (checkbox == true) {
                    // bankResponse=  BankService.BankByData(vm.creditCard.name, vm.creditCard.num, vm.creditCard.expmonth, vm.creditCard.expyear, vm.creditCard.ccv);
                    bankResponse = true;
                    /**END FOR CREDIT CARD*/
                    console.log("uuuuuuuuhh: ", bankResponse);
                    if (bankResponse == true) {



                        vm.ticketsToShow.forEach(function (ticket) {


                            vm.reservation.ticket={id: 1};
                            vm.reservation.amount=ticket.priceTicket;
                            vm.reservation.paymentMethod="CreditCard";


                            ReservationService.addReservation(vm.reservation).then(function () {
                                // vm.reservationsList();

                                $state.go('reservation');


                            });


                        });





                    }

                }

                else
                {


                    vm.ticketsToShow.forEach(function (ticket) {


                        vm.reservation.ticket={id: 1};
                        vm.reservation.amount=ticket.priceTicket;
                        vm.reservation.paymentMethod="Paypal";


                        ReservationService.addReservation(vm.reservation).then(function () {
                            // vm.reservationsList();

                            $state.go('reservation');


                        });


                    });






                }



            }

            else {
                console.log("Ti mana 9olna l kabar wfé");
            }

        };
        /** END Adding Reservation **/


        /**Reservation Timer**/

        $scope.counter = 1200;


        $scope.onTimeout = function () {
            $scope.counter--;
            mytimeout = $timeout($scope.onTimeout, 1000);
            if ($scope.counter == 0) {

                alert("Lkabar Wfé");
                $timeout.cancel(mytimeout);


                /** Update Ticket Numbers */



                $stateParams.tickets.forEach(function (ticket) {

                    TicketService.updateNbTicket(ticket);


                });


                /**END Update Ticket Numbers */


            }
        }
        var mytimeout = $timeout($scope.onTimeout, 1000);


        /**END Reservation Timer**/


    };
    /**Timer Filter*/
    a.filter('formatTimer', function () {
        return function (input) {
            function z(n) {
                return (n < 10 ? '0' : '') + n;
            }

            var seconds = input % 60;
            var minutes = Math.floor(input / 60);
            var hours = Math.floor(minutes / 60);
            return (z(hours) + ':' + z(minutes) + ':' + z(seconds));
        };
    });
    /**END Timer Filter*/
})();
