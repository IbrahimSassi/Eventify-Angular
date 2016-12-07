/**
 * Created by Hakim Mliki on 07/12/2016.
 * PS : NEVER NEVER NEVER TOUCH THIS FILE THANK YOU
 */
(function () {
    'use strict';

    /**My Module init**/
    angular
        .module('EventifyApp.user', [
            'ui.router',
        ])
        .config(config)
        .controller('UserCtrl', UserCtrl);
    /**End My Module Init**/

    /**Injection**/
    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    UserCtrl.$inject = ['UserService', '$state'];
    /**End Of Injection**/


    /** Route Config **/
    function config($stateProvider, $urlRouterProvider) {
        var userPath="user/";
        $stateProvider
            .state('listUsers', {
                url: '/users',
                templateUrl: userPath+'views/listUsers.html',
                controller: 'UserCtrl as user'
            })

        ;

    };
    /**End of Route Config**/

    /** Controller UseCtrl FUNCTION
     *
     * @param UserService
     * @param $state
     */
    function UserCtrl(UserService, $state) {

        /**Scoop Replace**/
        var vm = this;
        /***/

        /**List User**/
        vm.userList = function () {
            vm.users = UserService.getAllUsers();
            console.log(vm.users);
        }
        /**End List User**/


    };

    /**End UserCtrlFunction**/

})();

