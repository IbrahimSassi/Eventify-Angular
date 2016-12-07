/**
 * Created by Hakim Mliki on 07/12/2016.
 * PS : NEVER NEVER NEVER TOUCH THIS FILE THANK YOU
 */
(function () {
    'use strict';

    angular
        .module('EventifyApp.user')
        .service('UserService', UserServiceFN);

    UserServiceFN.$inject = ['UserFactory', '$filter'];


    function UserServiceFN(UserFactory, $filter) {

        this.getAllUsers = function () {
            return UserFactory.query();
        }


    }


})();

