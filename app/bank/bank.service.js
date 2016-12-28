/**
 * Created by mrfirases on 12/21/2016.
 */
(function () {
    'use strict';

    angular
        .module('EventifyApp.bank')
        .service('BankService', BankServiceFN);

    BankServiceFN.$inject = ['BankFactory', '$http','BankFactoryII'];


    function BankServiceFN(BankFactory, $http,BankFactoryII) {

        this.BankByData = function (name,num,expmonth,expyear,ccv) {
            return BankFactory.get({name: name,num: num,expmonth: expmonth,expyear: expyear,ccv: ccv});
        };

        this.updateAmount = function (cardNumber,amount) {
            return BankFactoryII.updateAmount({cardNumber: cardNumber, amount:amount});
        };




    }


})();
