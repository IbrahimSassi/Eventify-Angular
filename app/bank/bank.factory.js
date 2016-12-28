/**
 * Created by mrfirases on 12/21/2016.
 */
(function () {
    'use strict';

    angular
        .module('EventifyApp.bank')
        .factory('BankFactory', BankFactory);

    BankFactory.$inject = ['$resource'];

    /* @ngInject */
    function BankFactory($resource) {
        return $resource('http://localhost:18080/Eventify-web/rest/banque/:name/:num/:expmonth/:expyear/:ccv',
            {name: '@name'},{num: '@num'},{expmonth: '@expmonth'},{expyear: '@expyear'},{ccv: '@ccv'},
            {
                'update': {method: 'PUT'},

                'updateAmount': {
                    url: 'http://localhost:18080/Eventify-web/rest/banque/:cardNumber/:amount',
                    params: {
                        cardNumber: '@cardNumber',
                        amount: '@amount',

                    },
                    method: 'PUT'


                }


            }

        );
    }

})();