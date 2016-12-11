/**
 * Created by Ibrahim on 09/12/2016.
 */

(function () {
    'use strict';

    angular
        .module('EventifyApp.customForm')
        .factory('AttributFactory', AttributFactoryFN);

    AttributFactoryFN.$inject = ['$resource'];

    /* @ngInject */
    function AttributFactoryFN($resource) {
        return $resource('http://localhost:18080/Eventify-web/rest/attributs/:id',
            {id:'@id'},
            {
                'update': { method:'PUT' },
                'getAttributsByQuestion':{
                    url: 'http://localhost:18080/Eventify-web/rest/questions/:idQuestion/attributs',
                    method: 'GET',
                    params: {
                        idOrganization: '@idQuestion',
                    },
                    isArray: true

                }

            }
        );
    }

})();


