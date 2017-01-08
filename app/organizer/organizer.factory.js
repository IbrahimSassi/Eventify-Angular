/**
 * Created by ninou on 12/24/2016.
 */

(function () {
    'use strict';

    angular
        .module('EventifyApp.organizer')
        .factory('OrganizerFactory', OrganizerFactory);

    OrganizerFactory.$inject = ['$resource'];

    /* @ngInject */
    function OrganizerFactory($resource) {
        return $resource('http://localhost:18080/Eventify-web/rest/organizer/:id',

            {id: '@id'},

            {
                'update': {method: 'PUT'},


                'getOrganizer': {
                    url: 'http://localhost:18080/Eventify-web/rest/organizer',
                    params: {
                        idUser: '@idUser',
                        idOrganization: '@idOrganization',
                    },
                    method: 'GET'

                }

            }



        )





    }

})();