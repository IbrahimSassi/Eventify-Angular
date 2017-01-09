/**
 * Created by ninou on 12/24/2016.
 */
(function () {
    'use strict';

    angular
        .module('EventifyApp.organizer', [
            'ui.router'
        ])
        .config(config)
        .controller('OrganizerCtrl', OrganizerCtrl);


    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    OrganizerCtrl.$inject = ['OrganizerService', 'OrganizationService','UserService', '$stateParams','$rootScope'];


    /* @ngInject */
    function config($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('organizers', {
                url: '/organizer',
                templateUrl: '../organizer/views/ListOrganizers.html',
                controller: 'OrganizerCtrl as organizer',
                cache: false
            })


            .state('ListRequest', {
                url: '/organizer/request',
                templateUrl: '../organizer/views/ListRequest.html',
                controller: 'OrganizerCtrl as organizer',
                cache: false
            })

        ;

    };

    /* @ngInject */
    function OrganizerCtrl(OrganizerService,OrganizationService,UserService, $stateParams,$rootScope) {
        //On Init Start






        var vm = this;
        vm.title = 'Organizer List';
        vm.userConnectedId=$rootScope.currentUser.User.id;




        vm.getNotAcceptedRequest = function () {
            console.log("olaola"+OrganizationService.findOrganizationById(1));
            OrganizerService.getAllOrganizersByUserIdAndOrganizationId(vm.userConnectedId,null).then(function (data) {



                data.forEach(function (org) {
                    org.myOrg=OrganizationService.findOrganizationById(org.organizerPK.idOrganization);
                    console.log("jjjjjjjjjj",org);
                    org.president=UserService.getUserByID(org.organizerPK.idUser);

                });
                vm.requests= data;

                console.log("data123",vm.requests);

            });
        }



        /*    vm.getNotAcceptedRequest = function () {
         OrganizerService.getAllOrganizersByUserIdAndOrganizationId(vm.userConnectedId,null).then(function (data) {


         vm.requests = data;
         vm.OrganizationByUser=OrganizationService.getAllOrganizations();
         console.log("data123",vm.requests);

         });
         }*/

       // vm.idOrganization = $stateParams.idOrganization;

        vm.accept = function(userId,idOrganization){
         //   console.log("dkhalt l houni ya maalem");
           OrganizerService.AcceptOrganizer(vm.userConnectedId,idOrganization.idOrganization);
        }

        vm.refuse = function(userId,idOrganization){
            console.log("dkhalt l houni ya maalem");
            OrganizerService.RefuseOrganizer(vm.userConnectedId,idOrganization.idOrganization);
        }


      //  vm.idOrganization=1;

        vm.organizersList = function () {
            OrganizerService.getAllOrganizersByUserIdAndOrganizationId(vm.userConnectedId,null).then(function (data) {

                vm.organizers = data;

                console.log("data123",vm.organizers);

               vm.organizers.forEach(function (organization) {

                  console.log("heello here plzz",OrganizationService.findOrganizationById(organization.organizerPK.idOrganization));
                    organization.organization = OrganizationService.findOrganizationById(organization.organizerPK.idOrganization);


                });



            });
        }


        vm.remove = function (organizer) {
            console.log(organizer.organizerPK.idOrganization);
            OrganizerService.removeOrganizer(vm.userConnectedId, organizer.organizerPK.idOrganization).then(function () {
                vm.organizersList();
            });

        }



    }
})();




