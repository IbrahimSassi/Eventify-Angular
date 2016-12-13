/**
 * Created by narimen on 12/12/2016.
 */
(function () {
    'use strict';

    angular
        .module('EventifyApp.organization')
        .service('OrganizationService', OrganizationServiceFN);

    OrganizationServiceFN.$inject = ['OrganizationFactory', '$filter'];


    function OrganizationServiceFN(OrganizationFactory, $filter) {

        this.getAllOrganizations = function () {
            return OrganizationFactory.query().$promise;
        };






    }


})();