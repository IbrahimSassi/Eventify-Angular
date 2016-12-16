/**
 * Created by Ibrahim on 24/11/2016.
 */
(function () {
    'use strict';

    angular
        .module('EventifyApp.event')
        .factory('EventFactory', EventFactory);

    EventFactory.$inject = ['$resource'];

    /* @ngInject */
    function EventFactory($resource) {
        return $resource('http://localhost:18080/Eventify-web/rest/events/:id',
            {id: '@id'},
            {
                'update': {method: 'PUT'},
                'getEventsByOrganization': {
                    url: 'http://localhost:18080/Eventify-web/rest/organization/:idOrganization/events',
                    method: 'GET',
                    params: {
                        idOrganization: '@idOrganization',
                    },
                    isArray: true


                },
                'getMyRate': {
                    url: 'http://localhost:18080/Eventify-web/rest/events/:idEvent/rate',
                    method: 'GET',
                    params: {
                        idOrganization: '@idEvent',
                    },
                    isArray: false


                },
                'getMyTickets': {
                    url: 'http://localhost:18080/Eventify-web/rest/events/:idEvent/tickets',
                    method: 'GET',
                    params: {
                        idEvent: '@idEvent',
                    },
                    isArray: true


                }


            }
        );
    }

})();


