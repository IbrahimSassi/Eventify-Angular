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



        this.addAttribut = function (attribut) {
            //event = new EventFactory(event);
            return AttributFactory.save(attribut);
        }


    }

})();

