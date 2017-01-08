/**
 * Created by Hakim Mliki on 07/12/2016.
 * PS : NEVER NEVER NEVER TOUCH THIS FILE THANK YOU
 */
(function () {
    'use strict';

    angular
        .module('EventifyApp.user')
        .service('UserService', UserServiceFN);

    UserServiceFN.$inject = ['UserFactory', '$window', 'jwtHelper'];


    /**
     * UserServiceFN
     * @param UserFactory
     * @param $window
     * @param jwtHelper
     * @constructor
     */
    function UserServiceFN(UserFactory, $window, jwtHelper) {

        /***
         * --Functions--
         * - getAllUsers
         * - addUser
         * - updateUser
         * - deleteUser
         * - getUserByID
         *
         * - signIn
         * - changePassword
         * - saveToken
         * - getToken
         * - extractTokenData
         * - isAuth
         * - logout
         */


        /**
         *getAllUsers
         * @param token
         * @returns {*|Function}
         */
        this.getAllUsers = function (token) {
            return UserFactory.secured(token).query().$promise;
        }

        /**
         *addUser
         * @param user
         * @returns {*|Function}
         */
        this.addUser = function (user) {
            return UserFactory.secured(null).save(user).$promise;
        }

        /**
         *updateUser
         * @param user
         * @param token
         */
        this.updateUser = function (user, token) {
            UserFactory.secured(token).update({
                id: user.id
            }, user);
            console.log("Updated");
        }

        /**
         *deleteUser
         * @param user
         * @returns {*}
         */
        this.deleteUser = function (user) {
            return user.$delete();
        }

        /**
         *getUserByID
         * @param idUser
         */
        this.getUserByID = function (idUser) {
            return UserFactory.secured(null).get({
                id: idUser
            });
        }

        /**Special Method*/

        /**
         *signIn
         * @param usernameParam
         * @param pwdParam
         * @returns {*|Function}
         */
        this.signIn = function (usernameParam, pwdParam) {
            var result = UserFactory.secured(null).signIn({
                username: usernameParam,
                pwd: pwdParam
            });
            return result.$promise;

        }
        /**
         *changePassword
         * @param user
         * @param oldPwd
         * @param newPwd
         * @param token
         */
        this.changePassword = function (user, oldPwd, newPwd, token) {

            UserFactory.secured(token).changePassword({
                'oldPwd': oldPwd,
                'newPwd': newPwd
            },user);

        }

        this.confirmCompte = function (tokenToConfirm) {

            UserFactory.secured(null).confirmToken({
                tokenToConfirm: tokenToConfirm
            });

        }


        /**
         *saveToken
         * @param token
         */
        this.saveToken = function (token) {
            if ($window.localStorage['authToken'] == null) {
                if (token != null) {
                    $window.localStorage['authToken'] = token;

                }
            }

        }

        /**
         *getToken
         * @returns stored token from localStorage
         */
        this.getToken = function () {
            return $window.localStorage['authToken'];
        }

        /**
         *extractTokenData
         * @param token
         * @returns {Object}
         */
        this.extractTokenData = function (token) {
            return jwtHelper.decodeToken(token);
        }

        /**
         *isAuth
         * @returns {boolean}
         */
        this.isAuth = function () {
            var token = this.getToken();
            if (token != null) {
                var bool = jwtHelper.isTokenExpired(token);
                if (!bool) {
                    return true;

                } else {
                    this.logout();
                }
            }
            return false;

        }

        this.logout = function () {
            $window.localStorage.removeItem('authToken');

        }


        /**End of Special Method*/


    }


})();