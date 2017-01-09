/**
 * Created by asus on 19/12/2016.
 */

(function () {
    'use strict';

    /**My Module init**/
    angular
        .module('EventifyApp.referrel', [
            'ui.router',
        ])
        .config(config)
        .controller('ReferrelCtrl', ReferrelCtrl);
    /**End My Module Init**/

    /**Injection**/
    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    ReferrelCtrl.$inject = ['ReferrelService', '$state','UserService','$rootScope'];
    /**End Of Injection**/


    /** Route Config **/
    function config($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('referrel', {
                url: '/referrel',
                templateUrl: '../referrel/views/referrel.view.html',
                controller: 'ReferrelCtrl as referrel'
            })


        ;

    };
    /**End of Route Config**/


    function ReferrelCtrl(ReferrelService, $state,UserService,$rootScope) {


        var vm = this;



    UserService.getAllUsers(UserService.getToken()).then(function (data) {

        vm.allusers = data;

        console.log("haw l users",data);



    });




vm.referrerUser = function (usertorefferid) {

//****************
    vm.invite = {

        "referrelUserPK":
            {
                "idUserReferral":$rootScope.currentUser.User.id,
                "idUserReferred": usertorefferid

            },

        "dateInvitation":121245545,
        "stateInvitation": "WAITING",
        "event": {
            "id": 1
        }
    };


//****************************

    ReferrelService.addReferrel(vm.invite).then(function () {
     vm.invitedUser = UserService.getUserByID(usertorefferid);
        console.log( "aaaaaaaaaaaaaaaaaaaaaaaaaaaa",vm.invitedUser);
        console.log("gggg");


    });





    };


    }
})();

