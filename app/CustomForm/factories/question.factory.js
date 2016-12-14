/**
 * Created by Ibrahim on 09/12/2016.
 */

(function () {
    'use strict';

    angular
        .module('EventifyApp.customForm')
        .factory('QuestionFactory', QuestionFactoryFN);

    QuestionFactoryFN.$inject = ['$resource'];

    /* @ngInject */
    function QuestionFactoryFN($resource) {
        return $resource('http://localhost:18080/Eventify-web/rest/questions/:id',
            {id: '@id'},
            {
                'update': {method: 'PUT'},
                'getQuestionsByEvent': {
                    url: 'http://localhost:18080/Eventify-web/rest/events/:idEvent/questions',
                    method: 'GET',
                    params: {
                        idOrganization: '@idEvent',
                    },
                    isArray: true

                }
            }
        );
    }

})();






