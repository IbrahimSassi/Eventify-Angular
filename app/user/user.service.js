/**
 * Created by Hakim Mliki on 07/12/2016.
 * PS : NEVER NEVER NEVER TOUCH THIS FILE THANK YOU
 */
(function () {
    'use strict';

    angular
        .module('EventifyApp.user')
        .service('UserService', UserServiceFN);

    UserServiceFN.$inject = ['UserFactory', '$filter', '$timeout'];


    function UserServiceFN(UserFactory, $filter, $timeout) {


        this.getAllUsers = function () {
            return UserFactory.query().$promise;
        }
        this.signIn = function (usernameParam, pwdParam) {
            var result = UserFactory.signIn({username: usernameParam, pwd: pwdParam});
            return result.$promise;

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
    }


})();

