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
            var users = UserFactory.query();

            /***Optional For Test on users request response**/
            users
                .$promise
                .then(function (response) {

                    users = response;

                })
                .catch(function (errResponse) {
                    users = null;
                    console.info("Get All Users Error : " + errResponse);
                })
            ;
            /**End of Optional For Test on users request response**/

            return users;

        };

        this.registerUser = function (user) {
           var result = UserFactory.save(null,user);

            /***Optional For Test on users request response**/
            result
                .$promise
                .then(function (response) {

                    result = response;

                })
                .catch(function (errResponse) {
                    result = null;
                    console.info("Register User Error : " + errResponse);
                })
            ;
            /**End of Optional For Test on users request response**/

            return result;


        };


    }


})();

