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
            'angular-jwt',
        ])
        .config(config)
        .controller('UserCtrl', UserCtrl);

    /**End My Module Init**/

    /**Injection**/
    config.$inject = ['$stateProvider', '$urlRouterProvider', '$qProvider'];

    UserCtrl.$inject = ['UserService', '$state'];
    /**End Of Injection**/


    /** Route Config **/
    function config($stateProvider, $urlRouterProvider, $qProvider) {

        $stateProvider
            .state('listUsers', {
                url: '/users',
                templateUrl: 'user/views/list.user.view.html',
                controller: 'UserCtrl as user',
                authenticate: true,
            })
            .state('registerUser', {
                url: '/users/register',
                templateUrl: 'user/views/register.user.view.html',
                controller: 'UserCtrl as user',
                authenticate: true,
            })
            .state('loginUser', {
                url: '/users/login',
                templateUrl: 'user/views/login.user.view.html',
                controller: 'UserCtrl as user'
            })
            .state('changePasswordUser', {
                url: '/users/change-password',
                templateUrl: 'user/views/change-password.user.view.html',
                controller: 'UserCtrl as user',
                authenticate: true,
            })
            .state('editProfileUser', {
                url: '/users/edit-profile',
                templateUrl: 'user/views/edit-profile.user.view.html',
                controller: 'UserCtrl as user',
                authenticate: true,
            })

        ;

        $qProvider.errorOnUnhandledRejections(false);


    };
    /**End of Route Config**/

    /** Controller UseCtrl FUNCTION
     *
     * @param UserService
     * @param $state
     */
    function UserCtrl(UserService, $state) {

        /**Scope Replace**/
        var vm = this;
        /***/

        /**List User**/
        vm.getUsers = function () {
            UserService.getAllUsers(UserService.getToken()).then(function (data) {
                vm.users = data;
                console.log(vm.users);
            });

        }

        /**End List User**/

        /**Register User**/
        vm.register = function (user) {
            UserService.addUser(user).then(function () {
                vm.getUsers();
                $state.go('listUsers');
            });
        }
        /**End Register User**/

        /**SignIn Function */
        vm.signIn = function (username, pwd) {
            UserService.signIn(username, pwd).then(
                function (data) {
                    vm.tokenToStore = data.authToken;
                    UserService.saveToken(vm.tokenToStore);
                    $state.go('home');


                },
                function (error) {
                    console.log("Error Login : " + error);
                    $state.go('loginUser');
                }
            );

        }

        /**End of SignIn*/

        /**Change Password Function*/

        vm.changePassword = function (user,oldPwd, newPwd) {
           console.log(UserService.changePassword(user,oldPwd, newPwd,UserService.getToken()));
            $state.go('home');

        }

        /**End Of Change Password Function*/


    };

    /**End UserCtrlFunction**/

})();
