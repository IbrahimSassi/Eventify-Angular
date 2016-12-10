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

    UserCtrl.$inject = ['UserService', '$state', 'jwtHelper'];
    /**End Of Injection**/


    /** Route Config **/
    function config($stateProvider, $urlRouterProvider, $qProvider) {
        $stateProvider
            .state('listUsers', {
                url: '/users',
                templateUrl: 'user/views/list.user.view.html',
                controller: 'UserCtrl as user'
            })
            .state('registerUser', {
                url: '/users/register',
                templateUrl: 'user/views/register.user.view.html',
                controller: 'UserCtrl as user'
            })
            .state('loginUser', {
                url: '/users/login',
                templateUrl: 'user/views/login.user.view.html',
                controller: 'UserCtrl as user'
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
    function UserCtrl(UserService, $state, jwtHelper) {

        /**Scope Replace**/
        var vm = this;
        /***/

        /**List User**/
        vm.getUsers = function () {
            console.log(UserService.getAllUsers());
            UserService.getAllUsers().then(function (data) {
                vm.users = data;
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

        // vm.signIn = function () {
        //     UserService.signIn().then(function (data) {
        //         // console.log(data.content);
        //         vm.token = data;
        //         var expToken = data.content;
        //         console.log(jwtHelper.decodeToken(expToken));
        //
        //         if (!window.localStorage.getItem("token")) {
        //             window.localStorage.setItem("token", expToken);
        //         }
        //         else {
        //             window.localStorage.setItem("token", expToken);
        //         }
        //
        //     });
        //
        //
        // }
        vm.signIn = function () {
            var booleanLogin = UserService.signIn('kimo', '123456').then(function (data) {
                return true;
            });
            if (Boolean(booleanLogin)) {
                console.log("qzaz");
                console.log(booleanLogin);
            }
            else {
                console.log(booleanLogin);
            }

        }


    };

    /**End UserCtrlFunction**/

})();

