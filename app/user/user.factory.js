/**
 * Created by Hakim Mliki on 07/12/2016.
 * PS : NEVER NEVER NEVER TOUCH THIS FILE THANK YOU
 */
(function () {
    'use strict';

    angular
        .module('EventifyApp.user')
        .factory('UserFactory', UserFactory);

    UserFactory.$inject = ['$resource'];

    /* @ngInject */
    function UserFactory($resource) {
        return $resource('http://localhost:18080/Eventify-web/rest/users/:id',
            {id: '@id'},
            {
                'update': {method: 'PUT'}
            }
        );
    }

})();