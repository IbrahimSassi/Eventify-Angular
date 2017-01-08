/**
 * Created by narimen on 12/12/2016.
 */
(function () {
    'use strict';

    angular
        .module('EventifyApp.organization')
        .factory('OrganizationFactory', OrganizationFactory);

    OrganizationFactory.$inject = ['$resource'];

    /* @ngInject */
    function OrganizationFactory($resource) {
        return $resource('http://localhost:18080/Eventify-web/rest/organization/:id',
            {id: '@id'},
            {
                'update': {method: 'PUT'},
                'get': {method: 'GET'}
            }
        );
    }

})();