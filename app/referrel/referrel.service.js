/**
 * Created by asus on 19/12/2016.
 */

(function () {
    'use strict';

    angular
        .module('EventifyApp.referrel')
        .service('ReferrelService', ReferrelServiceFN);

    ReferrelServiceFN.$inject = ['ReferrelFactory', '$filter'];


    function ReferrelServiceFN(ReferrelFactory, $filter) {


        this.addReferrel =  function (invite) {
            console.log(invite);

            return ReferrelFactory.save(invite).$promise;
        };




    }


})();
