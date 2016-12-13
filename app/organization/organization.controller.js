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
    OrganizationCtrl.$inject = ['OrganizationService', '$state'];
    /**End Of Injection**/


    /** Route Config **/
    function config($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('listOrganizations', {
                url: '/organizations',
                templateUrl: '../organization/views/listOrganization.html',
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
    function OrganizationCtrl(OrganizationService, $state) {


        var vm = this;


        /**List Organizations**/
        vm.organizationsList = function () {
            console.log("called",OrganizationService.getAllOrganizations());
            OrganizationService.getAllOrganizations().then(function (data) {
                console.log("data",data);
                vm.organizations = data;
            });
        }



    };

    /**End OrganizationCtrlFunction**/

})();