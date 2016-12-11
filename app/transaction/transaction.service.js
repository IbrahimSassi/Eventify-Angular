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






    }


})();

/**
 * Created by moham on 12/10/2016.
 */
