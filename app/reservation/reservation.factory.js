/**
 * Created by mrfirases on 12/7/2016.
 */
(function () {
    'use strict';

    angular
        .module('EventifyApp.reservation')
        .factory('ReservationFactory', ReservationFactory);

    ReservationFactory.$inject = ['$resource'];

    /* @ngInject */
    function ReservationFactory($resource) {
        return $resource('http://localhost:18080/Eventify-web/rest/reservation/:id',
            {id: '@id'},
            {
                'update': {method: 'PUT'}
            }
        );
    }

})();