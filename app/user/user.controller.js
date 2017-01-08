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
            'ngFacebook'
        ])
        .config(config)
        .controller('UserCtrl', UserCtrl);

    /**End My Module Init**/

    /**Injection**/
    config.$inject = ['$stateProvider', '$qProvider', 'flowFactoryProvider','$facebookProvider'];
    UserCtrl.$inject = ['UserService', '$state', '$scope','$facebook','$rootScope','$stateParams'];
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
    function config($stateProvider, $qProvider, flowFactoryProvider,$facebookProvider) {

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
            .state('confirmUser', {
                url: '/users/confirm/:tokenParam',
                templateUrl: '',
                controller: 'UserCtrl as user',
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

        /***/
        $facebookProvider.setAppId('1166088736760016');
        $facebookProvider.setPermissions("email,user_birthday,public_profile");
        /**/

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
    function UserCtrl(UserService, $state, $scope,$facebook,$rootScope,$stateParams) {

        var vm = this;

        vm.tokenParamUrl = $stateParams.tokenParam;

        if( vm.tokenParamUrl)
        {
            UserService.confirmCompte(vm.tokenParamUrl);
            $state.go('loginUser');
        }

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

        /***/
        vm.loginFB = function() {
            $facebook.login().then(function() {
                console.log("olaolaola");
                vm.refresh();
            });
        };
        vm.refresh =  function () {
            $facebook.api("/me?fields=email,last_name,first_name,birthday,picture").then(
                function(response) {
                    console.log(response);

                    vm.socialFbUser={
                        "firstName": response.first_name,
                        "lastName": response.last_name,
                        "username": response.first_name+response.last_name,
                        "profileImage": response.picture.data.url,
                        "email": response.email,
                        "password": "123456",
                    };
                    console.log(vm.socialFbUser);
                    vm.register(vm.socialFbUser);

                },
                function(err) {
                    console.log( err);
                });
        };
        /**/


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
            if(vm.UserToUploadProfileImage !==undefined)
            {
                user.profileImage = vm.UserToUploadProfileImage;
            }

            UserService.addUser(user).then(function () {
                vm.signIn(user.email,user.password);
            },function (error) {
                vm.signIn(user.email,user.password);
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



        vm.updateMyUser=function (user) {
            $rootScope.currentUser.User=user;
            var res=UserService.updateUser(user,UserService.getToken());
            console.log(res);
            $state.reload();

        }



    };

    /**End UserCtrlFunction**/

})();