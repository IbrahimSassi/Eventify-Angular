/**
 * Created by Ibrahim on 24/11/2016.
 */
(function () {
    'use strict';

    angular
        .module('EventifyApp.eventFactory',[
        ])
        .factory('EventFactory', EventFactory);

    EventFactory.$inject = ['$resource'];

    /* @ngInject */
    function EventFactory($resource) {
        return $resource('https://jsonplaceholder.typicode.com/posts');
    }

})();

