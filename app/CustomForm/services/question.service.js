/**
 * Created by Ibrahim on 09/12/2016.
 */

(function () {
    'use strict';

    angular
        .module('EventifyApp.customForm')
        .service('QuestionService', QuestionServiceFN);

    QuestionServiceFN.$inject = ['QuestionFactory'];

    /* @ngInject */
    function QuestionServiceFN(QuestionFactory) {

        this.getQuestionsByEvent = getQuestionsByEventFn;

        this.addQuestion = function (question) {
            //event = new EventFactory(event);
            return QuestionFactory.save(question);
        }

        function getQuestionsByEventFn(idEvent) {
            return QuestionFactory.getQuestionsByEvent({idEvent:idEvent}).$promise;
        }


    }

})();

