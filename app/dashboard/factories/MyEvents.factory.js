(function () {
    'use strict';

    angular
        .module('EventifyApp.dashboard')
        .factory('MyEventsFactory', MyEventsFactory);

    MyEventsFactory.$inject = ['$resource'];

    /* @ngInject */
    function MyEventsFactory($resource) {


            return $resource('http://localhost:18080/Eventify-web/rest/organization/:id/events',
                {id:'@id'}
            );

        ////////////////
    }

})();

