


(function () {
    'use strict';

    angular
        .module('EventifyApp.rates',[])
        .factory('RatesFactory', RatesFactory);

    RatesFactory.$inject = ['$resource'];

    /* @ngInject */
    function RatesFactory($resource) {
        return $resource('http://localhost:18080/Eventify-web/rest/rates/:id',
            {id: '@id'},
            {
                'update': {method: 'PUT'}

            }








        );
    }

})();