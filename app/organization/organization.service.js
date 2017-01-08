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
        }

        this.addOrganization = function (organization) {
            console.log("ti ahaya",organization);
            return OrganizationFactory.save(organization).$promise;
        };

        this.deleteOrganization = function deleteOrganizationFN(organization) {
            console.log("tfasa5",organization);
            return organization.$delete();
        }

        this.updateOrganization =function updateOrganizationFN(organization) {
            OrganizationFactory.update({id: organization.id}, organization);
            console.log("Updated");
        }


        this.findOrganizationById=function findOrganizationByIdFN(OrganizationId) {
          //  console.log("called112", OrganizationFactory.get({id: OrganizationId}));
            return OrganizationFactory.get({id: OrganizationId});
        }
    }


})();