/**
 * Created by Ibrahim on 09/12/2016.
 */

(function () {
    'use strict';

    angular
        .module('EventifyApp.customForm')
        .service('AttributService', AttributServiceFN);

    AttributServiceFN.$inject = ['AttributFactory'];

    /* @ngInject */
    function AttributServiceFN(AttributFactory) {

        this.getAttributsByQuestion = getAttributsByQuestionFn;
        this.addAttribut = addAttributFN;


        function addAttributFN(attribut) {
            //event = new EventFactory(event);
            return AttributFactory.save(attribut);
        }


        function getAttributsByQuestionFn(idQuestion) {
            // console.log('attributs for question ' +idQuestion , AttributFactory.getAttributsByQuestion({idQuestion:idQuestion}));
            return AttributFactory.getAttributsByQuestion({idQuestion:idQuestion});
        }
    }

})();

