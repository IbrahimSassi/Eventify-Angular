/**
 * Created by mrfirases on 12/10/2016.
 */
(function () {
    'use strict';

    angular
        .module('EventifyApp.transaction')
        .service('TransactionService', TransactionServiceFN);

    TransactionServiceFN.$inject = ['TransactionFactory', '$filter'];


    function TransactionServiceFN(TransactionFactory, $filter) {

        this.getAllTransactions = function () {
            return TransactionFactory.query().$promise;
        };


        this.payReservation = function (idReservation) {
            console.log("paypal: ",TransactionFactory.payReservation({idReservation: idReservation}));
            return TransactionFactory.payReservation({idReservation: idReservation}).$promise;
        }

        this.addTransaction =  function (transaction) {


            return TransactionFactory.save(transaction).$promise;
        }



    }


})();
