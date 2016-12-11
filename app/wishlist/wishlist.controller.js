/**
 * Created by Ibrahim on 11/12/2016.
 */

(function () {
    'use strict';

    angular
        .module('EventifyApp.wishlist', [
            'ui.router'

        ])
        .config(config)
        .controller('WishlistCtrl', WishlistCtrlFN);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    /* @ngInject */
    function config($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('wishlist', {
                url: '/wishlist/me',
                templateUrl: 'wishlist/views/listing-myWishlist.view.html',
                controller: 'WishlistCtrl as wishlist',
                cache: false
            })
        ;


    };

    WishlistCtrlFN.$inject = ['WishlistService', 'EventService'];

    /* @ngInject */
    function WishlistCtrlFN(WishlistService, EventService) {
        var vm = this;
        vm.title = 'My Wishlist';
        vm.userConnectedId = 1;


        //Getting Wishlist On Init
        vm.GetWishlist = function () {
            WishlistService.getWishlistsByUser(vm.userConnectedId, null).then(function (data) {

                vm.myWishlist = data;
                vm.myWishlist.forEach(function (event) {


                    event.event = EventService.getEventByID(event.wishlistPK.eventId);


                });

                console.log(vm.myWishlist);
                vm.myWishlist.forEach(function (event) {

                    event.event.$promise.then(function (data) {
                        event.event.adress = EventService.getAddress(event.event.latitude, event.event.longitude);
                        // console.log(event.event.adress);
                        event.event.adress.then(function (adr) {
                            event.event.adress = adr.data.results[0].formatted_address;

                        })
                    })
                    // console.log(EventService.getAddress(event.event.latitude,event.event.longitude));

                })
            });

        }


        vm.remove = function (event) {
            console.log(event.wishlistPK.eventId);
            WishlistService.removeFromWishlist(vm.userConnectedId, event.wishlistPK.eventId).then(function () {
                vm.GetWishlist();
            });
        }

    }

})();

