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
        $stateProvider
            .state('listUsers', {
                url: '/users',
                templateUrl: '../user/views/listUsers.html',
                controller: 'UserCtrl as user'
            })
            .state('registerUser', {
                url: '/users/register',
                templateUrl: '../user/views/registerUser.html',
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
        /*Static value to test*/
        vm.user ={
            "firstName": "HakimN",
            "lastName": "MlikiN",
            "username": "HakimmN",
            "profileImage": "http://img.wennermedia.com/article-leads-vertical-300/1250530894_brad_pitt_290x402.jpg",
            "numTel": "+21623924188",
            "email": "hakim.mliki@espritos.tn",
            "password": "e10adc3949ba59abbe56e057f20f883e",
            "creationDate": 1481050808000,
            "loyaltyPoint": 1,
            "accountState": "NOTACTIVATED",
            "confirmationToken": "11917e461400d833a3cef4f0594c9a74",
            "banState": 0
        }


        /**List User**/
        vm.userList = function () {
            vm.users = UserService.getAllUsers();
            console.log(vm.users);
        }
        /**End List User**/

        /**Register User**/
        vm.register = function () {
            UserService.registerUser(vm.user)
            vm.users = UserService.getAllUsers();
            $state.go('listUsers');

        }
        /**End Register User**/


    };

    /**End UserCtrlFunction**/

})();

