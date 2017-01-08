(function () {
    'use strict';

    angular
        .module('EventifyApp.rates')
        .service('ratesService', ratesServiceFN);

    ratesServiceFN.$inject = ['RatesFactory', '$filter','$http'];


    function ratesServiceFN(RatesFactory, $filter,$http) {


        this.addRate = function (rate) {
            return RatesFactory.save(rate).$promise;
        }
        this.getRateByEvent = function (idEvent) {

            return $http.get("http://localhost:18080/Eventify-web/rest/rates/"+idEvent);


        }




    }


})();

