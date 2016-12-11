/**
 * Created by Ibrahim on 11/12/2016.
 */
(function () {
    'use strict';

    angular
        .module('EventifyApp.wishlist')
        .service('WishlistService', WishlistService);

    WishlistService.$inject = ['WishlistFactory'];

    /* @ngInject */
    function WishlistService(WishlistFactory) {

        this.addToWishlist = addToWishlistFN;
        this.removeFromWishlist = removeFromWishlistFN;
        this.getWishlistsByUserAndEvent = getWishlistsByUserAndEventFN;


        ////////////////

        function addToWishlistFN(UserId,eventId) {
            var wishlist =   {
                "wishlistPK": {
                    "userId": UserId,
                    "eventId": eventId
                },
                "dateAdding": new Date()
            };

            WishlistFactory.save(wishlist);

        }

        function removeFromWishlistFN(UserId,eventId) {
            return WishlistFactory.delete({userId:UserId,eventId:eventId});
        }


        function getWishlistsByUserAndEventFN(UserId,eventId) {
            // console.log(WishlistFactory.query({userId:UserId,eventId:eventId}))
            return WishlistFactory.get({userId:UserId,eventId:eventId}).$promise;
        }
    }

})();

