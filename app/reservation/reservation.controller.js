/**
 * Created by mrfirases on 12/7/2016.
 */
(function () {
    'use strict';

    /**My Module init**/
    angular
        .module('EventifyApp.reservation', [
            'ui.router',
        ])
        .config(config)
        .controller('ReservationCtrl', ReservationCtrl);
    /**End My Module Init**/

    /**Injection**/
    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    ReservationCtrl.$inject = ['ReservationService', '$state'];
    /**End Of Injection**/


    /** Route Config **/
    function config($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('listReservations', {
                url: '/reservations',
                templateUrl: '../reservation/views/listReservations.html',
                controller: 'ReservationCtrl as reservation'
            })


        ;

    };
    /**End of Route Config**/

    /** Controller UseCtrl FUNCTION
     *
     * @param UserService
     * @param $state
     */
    function ReservationCtrl(ReservationService, $state) {


        var vm = this;


        /**List Reservations**/
        vm.reservationsList = function () {
            console.log("called",ReservationService.getAllReservations());
            ReservationService.getAllReservations().then(function (data) {
                console.log("data",data);
                vm.reservations = data;
            });
        }



    };

    /**End UserCtrlFunction**/

})();
