/**
 * Created by asus on 19/12/2016.
 */

(function () {
    'use strict';

    angular
        .module('EventifyApp.referrel')
        .factory('ReferrelFactory', ReferrelFactory);

    ReferrelFactory.$inject = ['$resource'];

    /* @ngInject */
    function ReferrelFactory($resource) {
        return $resource('http://localhost:18080/Eventify-web/rest/referrel/:id',
            {id: '@id'},
            {
                'update': {method: 'PUT'},



            }
        );
    }

})();