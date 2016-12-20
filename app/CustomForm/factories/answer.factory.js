/**
 * Created by Ibrahim on 20/12/2016.
 */

(function () {
    'use strict';

    angular
        .module('EventifyApp.customForm')
        .factory('AnswerFactory', AnswerFactory);

    AnswerFactory.$inject = ['$resource'];

    /* @ngInject */
    function AnswerFactory($resource) {

        return $resource('http://localhost:18080/Eventify-web/rest/attributs/:id',
            {id: '@id'}

        );
    }

})();

