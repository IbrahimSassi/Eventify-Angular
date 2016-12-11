/**
 * Created by Ibrahim on 11/12/2016.
 */

(function () {
    'use strict';

    angular
        .module('EventifyApp.wishlist',[
            'ui.router'

        ])
        .config(config)
        .controller('WishlistCtrl', WishlistCtrlFN);

    config.$inject = ['$stateProvider','$urlRouterProvider'];

    /* @ngInject */
    function config ($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('wishlist',{
                url:'/wishlist/me',
                templateUrl:'wishlist/views/listing-myWishlist.view.html',
                controller: 'WishlistCtrl as wishlist',
                cache:false
            })
        ;




    };

    WishlistCtrlFN.$inject = ['WishlistService'];

    /* @ngInject */
    function WishlistCtrlFN(WishlistService) {
        var vm = this;
        vm.title = 'WishlistListing';






    }

})();

