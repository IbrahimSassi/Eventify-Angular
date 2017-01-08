/**
 * Created by mrfirases on 12/10/2016.
 */
(function () {
    'use strict';

    angular
        .module('EventifyApp.ticket')
        .factory('TicketFactory', TicketFactory);

    TicketFactory.$inject = ['$resource'];

    /* @ngInject */
    function TicketFactory($resource) {
        return $resource('http://localhost:18080/Eventify-web/rest/tickets/:id',
            {id: '@id'},
            {
                'update': {method: 'PUT'},


                'getTicketsByEvent': {
                    url: 'http://localhost:18080/Eventify-web/rest/tickets/getByEvent/:idEvent',
                    params: {
                        idEvent: '@idEvent',

                    },
                    method: 'GET',
                    isArray: true


                }

            }
        );
    }

})();