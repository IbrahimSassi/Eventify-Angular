/**
 * Created by narimen on 12/12/2016.
 */
(function () {
    'use strict';

    /**My Module init**/
    angular
        .module('EventifyApp.organization', [
            'ui.router',
        ])
        .config(config)
        .controller('OrganizationCtrl', OrganizationCtrl);
    /**End My Module Init**/

    /**Injection**/
    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    OrganizationCtrl.$inject = ['OrganizationService', '$state', '$stateParams', 'UserService', 'OrganizerService', 'EventService'];
    /**End Of Injection**/


    /** Route Config **/
    function config($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('listOrganizations', {
                url: '/organizations',
                templateUrl: '../organization/views/listOrganization.html',
                controller: 'OrganizationCtrl as organization'
            })

            .state('createOrganization', {
                url: '/organizations/create',
                templateUrl: '../organization/views/createOrganization.html',
                controller: 'OrganizationCtrl as organizationCreate'

            })


            .state('EditOrganizations', {
                url: '/organizations/update/:OrganizationId',
                templateUrl: '../organization/views/EditOrganization.html',
                controller: 'OrganizationCtrl as OrganizationEdit'
            })

            .state('organizationDetail', {
                url: '/organizations/:OrganizationId',
                templateUrl: '../organization/views/DetailsOrganization.html',
                controller: 'OrganizationCtrl as organization'

            })


        ;

    };
    /**End of Route Config**/

    /** Controller UseCtrl FUNCTION
     *
     * @param OrganizationService
     * @param $state
     */
    function OrganizationCtrl(OrganizationService, $state, $stateParams, UserService, OrganizerService, EventService) {


        var vm = this;


        /**List Organizations**/
        vm.organizationsList = function () {

            OrganizationService.getAllOrganizations().then(function (data) {
                console.log("data", data);
                var nbEvents = 0;
                var rates=0;
                EventService.getAllEvents().then(function (success) {
                    data.forEach(function (organization) {
                        nbEvents=0;
                        rates=0;
                        success.forEach(function (event) {
                                if (event.organization.id === organization.id) {

                                      EventService.getMyRate(event.id).then(function (ok) {

                                         if(ok.rateAvg!==undefined)
                                         {
                                             nbEvents++;
                                             rates +=ok.rateAvg;
                                                if(organization.organizationRate===undefined)
                                                {
                                                    organization.organizationRate=0;
                                                    organization.organizationRateHalf=0;
                                                }
                                             organization.organizationRate+=ok.rateAvg;
                                             organization.organizationRateHalf=organization.organizationRate%1;
                                             organization.organizationRate=parseInt(organization.organizationRate/nbEvents);


                                         }


                                    })

                                    console.log(rates);
                                }
                            }
                        )


                    });
                    vm.organizations = data;
                    console.log("----------------------");
                    console.log(data);
                });


            });
        }
        /**end list organizations*/

        /**create organizations **/
        vm.create = function () {
            vm.organization.creationDate = new Date();
            OrganizationService.addOrganization(vm.organization).then(function () {
                vm.getAllOrganizations();

                $state.go('createOrganization');
            });
        }

        vm.organization = {
            //  creationDate: new  date(),
            user: {id: 1},
        };

        /**End create organizations**/


        /*delete orgaization*/
        vm.delete = function (organization, index) {
            OrganizationService.deleteOrganization(organization).then(function () {
                vm.getAllOrganizations();
            });

        };
        /*end delete*/


        /*update fct*/

        vm.displayToUpdate = function (organization) {

            OrganizationService.findOrganizationById(vm.OrganizationId).$promise.then(function (data) {
                console.log(data);
                vm.editedOragnization = data;

            })

        };


        vm.update = function () {
            OrganizationService.updateOrganization(vm.editedOragnization);
            $state.go('listOrganizations')
        };

        /*end update fct*/

        //getting Organization id passed in params to get Organization
        vm.OrganizationId = $stateParams.OrganizationId;

        // vm.UserId = $stateParams.UserId;


        vm.details = function () {

            vm.selectedOrganization = OrganizationService.findOrganizationById(vm.OrganizationId).$promise.then(function (data) {



                vm.organizationToDisplay = data;

            })




            vm.listUsers = UserService.getAllUsers(UserService.getToken()).then(function (data) {
                vm.users = data;
                console.log("lllllllllllll", vm.users);
            })


        };


        /**** list users****/


        /**List User**/
        vm.getUsers = function () {
            UserService.getAllUsers(UserService.getToken(UserService.getToken())).then(function (data) {
                vm.users = data;
                console.log(vm.users);
            });

        }
        /**End List User**/


        /*****end list users********/




        vm.addOrganizer = function (userId) {
            console.log("idorganizetion", vm.OrganizationId)
            console.log("iduser", userId.userId)
            OrganizerService.addOrganizer(userId.userId, vm.OrganizationId);


        };


    };


    /**End OrganizationCtrlFunction**/


































})();