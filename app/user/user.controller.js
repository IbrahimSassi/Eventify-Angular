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
            'flow',
        ])
        .config(config)
        .controller('UserCtrl', UserCtrl);

    /**End My Module Init**/

    /**Injection**/
    config.$inject = ['$stateProvider', '$qProvider', 'flowFactoryProvider'];
    UserCtrl.$inject = ['UserService', '$state', '$scope'];
    /**End Of Injection**/


    /** Route Config **/
    /**
     *config
     *
     * @param $stateProvider
     * @param $qProvider
     * @param flowFactoryProvider
     * flowFactoryProvider : for Upload Files from Module flow
     */
    function config($stateProvider, $qProvider, flowFactoryProvider) {

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


        /**
         * To Upload File In your Work
         * */
        flowFactoryProvider.defaults = {
            target: 'http://eventify-files.eu5.org/up.php',
            permanentErrors: [404, 500, 501],
            maxChunkRetries: 1,
            chunkRetryInterval: 5000,
            simultaneousUploads: 4
        };
        flowFactoryProvider.on('catchAll', function (event) {
            console.log(arguments);
            if (typeof arguments[2] === "string") {
                var fullPath = JSON.parse(arguments[2]).flowRelativePath;
                //the Hidden input to have the url full path  !!
                document.getElementById("login-form-profile").value = fullPath;
                // Must Add
            }
        });
        /**End Upload File*/

        $qProvider.errorOnUnhandledRejections(false);


    };
    /**End of Route Config**/


    /* @ngInject */
    /**
     *UserCtrl
     * @param UserService
     * @param $state
     * @param $scope
     * @constructor
     */
    function UserCtrl(UserService, $state, $scope) {

        var vm = this;

        /**
         * --Functions--
         * - getUsers
         * - register
         * - signIn
         * - changePassword
         */
        /**Watch if input changed with JavaScript than it will update the scope
         * cause the ng-model can't be updated with simple javaScipt*/
        var elementInputToUpload = document.getElementById("login-form-profile");
        if (elementInputToUpload !== null) {
            $scope.$watch(function () {
                return elementInputToUpload.value;
            }, function (newVal, oldVal) {

                if (oldVal !== newVal && newVal !== undefined) {
                    vm.UserToUploadProfileImage = newVal;
                    console.log("test upload image update scope : " + vm.UserToUploadProfileImage);
                }

            });
        }

        /**End watch for file update*/


        /**List User**/
        vm.getUsers = function () {
            UserService.getAllUsers(UserService.getToken()).then(function (data) {
                vm.users = data;
                console.log(vm.users);
            });

        }
        /**End List User**/


        /**
         *register
         * @param user
         */
        vm.register = function (user) {
            //insert local scope inside the comming scope from the FORM like a Set() in java
            user.profileImage = vm.UserToUploadProfileImage;
            UserService.addUser(user).then(function () {
                vm.getUsers();
                $state.go('listUsers');
            });
        }
        /**End Register User**/


        /**
         *SignIn
         * @param username
         * @param pwd
         */
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


        /**
         *changePassword
         * @param user
         * @param oldPwd
         * @param newPwd
         */
        vm.changePassword = function (user, oldPwd, newPwd) {
            console.log(UserService.changePassword(user, oldPwd, newPwd, UserService.getToken()));
            $state.go('home');
        }
        /**End Of Change Password Function*/

    };

    /**End UserCtrlFunction**/

})();