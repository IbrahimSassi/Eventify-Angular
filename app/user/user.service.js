/**
 * Created by Hakim Mliki on 07/12/2016.
 * PS : NEVER NEVER NEVER TOUCH THIS FILE THANK YOU
 */
(function () {
    'use strict';

    angular
        .module('EventifyApp.user')
        .service('UserService', UserServiceFN);

    UserServiceFN.$inject = ['UserFactory', '$filter', '$window', 'jwtHelper'];


    function UserServiceFN(UserFactory, $filter, $window, jwtHelper) {


        this.getAllUsers = function () {
            return UserFactory.query().$promise;
        }

        this.addUser = function (user) {
            return UserFactory.save(user).$promise;
        }

        this.updateUser = function (user) {
            UserFactory.update({id: user.id}, user);
            console.log("Updated");
        }

        this.deleteUser = function (user) {
            return user.$delete();
        }

        this.getUserByID = function (idUser) {
            return UserFactory.get({id: idUser});
        }

        /**Special Method*/

        this.signIn = function (usernameParam, pwdParam) {
            var result = UserFactory.signIn({username: usernameParam, pwd: pwdParam});
            return result.$promise;

        }

        this.saveToken = function (token) {
            if ($window.localStorage['authToken'] == null) {
                if(token!=null)
                $window.localStorage['authToken'] = token;
            }

        }

        this.getToken = function () {
            return $window.localStorage['authToken'];
        }

        this.extractTokenData = function (token) {
            return jwtHelper.decodeToken(token);
        }

        this.isAuth = function () {
            var token = this.getToken();
            if (token != null) {
                var bool = jwtHelper.isTokenExpired(token);
                if (!bool) {
                    return true;
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

