/**
 * Created by mrfirases on 12/7/2016.
 */
(function () {
    'use strict';

    /**My Module init**/
    var a=angular
        .module('EventifyApp.reservation', [
            'ui.router',
        ])
        .config(config)
        .controller('ReservationCtrl', ReservationCtrl);
    /**End My Module Init**/

    /**Injection**/
    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    ReservationCtrl.$inject = ['ReservationService', '$state', 'BankService', '$rootScope', '$scope', '$timeout'];
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
                controller: 'ReservationCtrl as createReservation'
            })

        ;

    };
    /**End of Route Config**/

    /** Controller UseCtrl FUNCTION
     *
     * @param UserService
     * @param $state
     */
    function ReservationCtrl(ReservationService, $state, BankService, $rootScope, $scope, $timeout) {


        var vm = this;

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
        if ($rootScope.currentUser != null) {
            vm.reservation = {
                amount: 555.23,
                reservationDate: 1478069109000,
                user: {id: $rootScope.currentUser.User.id},

                ticket: {id: 1},

            }
        }
        vm.add = function () {

            console.log("ahaya", vm.creditcardstat);
            /*************************/
            BankService.BankByData(vm.creditCard.name, vm.creditCard.num, vm.creditCard.expmonth, vm.creditCard.expyear, vm.creditCard.ccv).then(function (data) {
                console.log("CreditCardValidity: ", data);

            });
            /**************************/

            ReservationService.addReservation(vm.reservation).then(function () {
                vm.reservationsList();

                $state.go('reservation');


            });
        };


        /**Reservation Timer**/

        $scope.counter = 5;
        $scope.stopped = false;
        $scope.buttonText = 'Stop';
        $scope.onTimeout = function () {
            $scope.counter--;
            mytimeout = $timeout($scope.onTimeout, 1000);
            if ($scope.counter ==0) {
                alert("Lkabar Wfé");
                $timeout.cancel(mytimeout);

            }
        }
        var mytimeout = $timeout($scope.onTimeout, 1000);
        $scope.takeAction = function () {
            if (!$scope.stopped) {
                $timeout.cancel(mytimeout);
                $scope.buttonText = 'Resume';
            }
            else {
                mytimeout = $timeout($scope.onTimeout, 1000);
                $scope.buttonText = 'Stop';
            }
            $scope.stopped = !$scope.stopped;
        }


        /**END Reservation Timer**/


    };

a.filter('formatTimer', function() {
    return function(input)
    {
        function z(n) {return (n<10? '0' : '') + n;}
        var seconds = input % 60;
        var minutes = Math.floor(input / 60);
        var hours = Math.floor(minutes / 60);
        return (z(hours) +':'+z(minutes)+':'+z(seconds));
    };
});

})();
