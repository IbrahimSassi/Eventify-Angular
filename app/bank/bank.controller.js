/**
 * Created by mrfirases on 12/21/2016.
 */
(function () {
    'use strict';

    /**My Module init**/
    angular
        .module('EventifyApp.bank', [
            'ui.router',
        ])
        .config(config)
        .controller('BankCtrl', BankCtrl);
    /**End My Module Init**/

    /**Injection**/
    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    BankCtrl.$inject = ['BankService', '$state'];
    /**End Of Injection**/


    /** Route Config **/
    function config($stateProvider, $urlRouterProvider) {


    };
    /**End of Route Config**/

    /** Controller UseCtrl FUNCTION
     *
     * @param UserService
     * @param $state
     */
    function BankCtrl(BankService, $state) {


        var vm = this;


        /**List Transactions**/
      /*  vm.MyBank = function () {

            BankService.BankByData().then(function (data) {
                console.log("data",data);
                vm.banks = data;
            });
        }*/



    };

    /**End UserCtrlFunction**/

})();
