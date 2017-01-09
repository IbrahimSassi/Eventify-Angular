/**
 * Created by killer on 12/30/2016.
 */

(function () {
    'use strict';

    angular
        .module('EventifyApp.discussion',[])
        .factory('DiscussionFactory', DiscussionFactory);

    DiscussionFactory.$inject = ['$resource'];

    /* @ngInject */
    function DiscussionFactory($resource) {
        return $resource('http://localhost:18080/Eventify-web/rest/Discussions/:id',
            {id: '@id'},
            {
                'update': { method:'PUT' },













            }
        );
    }

})();


