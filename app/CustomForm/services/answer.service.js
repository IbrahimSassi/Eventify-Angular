/**
 * Created by Ibrahim on 20/12/2016.
 */


(function () {
    'use strict';

    angular
        .module('EventifyApp.customForm')
        .service('AnswerService', AnswerServiceFN);

    AnswerServiceFN.$inject = ['AnswerFactory'];

    /* @ngInject */
    function AnswerServiceFN(AnswerFactory) {

        this.addAnswer = addAnswerFN;


        function addAnswerFN(answer) {
            //event = new EventFactory(event);
            return AnswerFactory.save(answer);
        }


    }

})();

