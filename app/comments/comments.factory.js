


(function () {
    'use strict';

    angular
        .module('EventifyApp.comments')
        .factory('CommentsFactory', CommentsFactory);

    CommentsFactory.$inject = ['$resource'];

    /* @ngInject */
    function CommentsFactory($resource) {
        return $resource('http://localhost:18080/Eventify-web/rest/comments/:id',
            {id: '@id'},
            {
                'update': {method: 'PUT'},

                'getCommentByUserIdAndEventIdFactory': {
                    url: 'http://localhost:18080/Eventify-web/rest/comments/:idUser/:idEvent',
                    method: 'GET',
                    params: {
                        idUser: '@idUser',
                        idEvent: '@idEvent'
                    },



                },
            }

        );
    }

})();