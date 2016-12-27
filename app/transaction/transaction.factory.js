/**
 * Created by mrfirases on 12/10/2016.
 */
(function () {
    'use strict';

    angular
        .module('EventifyApp.transaction')
        .factory('TransactionFactory', TransactionFactory);

    TransactionFactory.$inject = ['$resource'];

    /* @ngInject */
    function TransactionFactory($resource) {
        return $resource('http://localhost:18080/Eventify-web/rest/transaction/:id',
            {id: '@id'},
            {
                'update': {method: 'PUT'},


                'payReservation': {
                    url: 'http://localhost:18080/Eventify-web/rest/transaction/paypal/pay/:idReservation',
                    params: {
                        idReservation: '@idReservation',

                    },
                    method: 'GET'


                }
            }
        );
    }

})();