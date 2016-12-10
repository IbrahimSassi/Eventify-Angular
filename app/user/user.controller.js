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
                templateUrl: '../user/views/listUsers.html',
                controller: 'UserCtrl as user'
            })
            .state('registerUser', {
                url: '/users/register',
                templateUrl: '../user/views/registerUser.html',
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
        vm.register = function () {
            UserService.addUser(vm.user).then(function () {
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


        /*Static value to test*/
        vm.user = {
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


    };

    /**End UserCtrlFunction**/

})();

