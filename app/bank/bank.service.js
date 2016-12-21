/**
 * Created by mrfirases on 12/21/2016.
 */
(function () {
    'use strict';

    angular
        .module('EventifyApp.bank')
        .service('BankService', BankServiceFN);

    BankServiceFN.$inject = ['BankFactory', '$http'];


    function BankServiceFN(BankFactory, $http) {

        this.BankByData = function (name,num,expmonth,expyear,ccv) {
            return BankFactory.get({name: name,num: num,expmonth: expmonth,expyear: expyear,ccv: ccv}).$promise;
        };






    }


})();
