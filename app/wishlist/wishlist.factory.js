/**
 * Created by Ibrahim on 11/12/2016.
 */

(function () {
    'use strict';

    angular
        .module('EventifyApp.wishlist')
        .factory('WishlistFactory', WishlistFactory);

    WishlistFactory.$inject = ['$resource'];

    /* @ngInject */
    function WishlistFactory($resource) {
        return $resource('http://localhost:18080/Eventify-web/rest/wishlists', null);

    }

})();

