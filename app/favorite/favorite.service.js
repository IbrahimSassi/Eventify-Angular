/**
 * Created by Ibrahim on 25/12/2016.
 */
(function () {
    'use strict';

    angular
        .module('EventifyApp.favorite', [])
        .config(config)
        .service('FavoriteService', FavoriteServiceFN);

    FavoriteServiceFN.$inject = ['FavoriteFactory'];



    /* @ngInject */
    function config($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('favorite', {
                url: '/favorite/new',
                templateUrl: 'favorite/views/favorite.view.html',
                controller: 'FavoriteCtrl as favorite',
                cache: false
            })
        ;

    };


    /* @ngInject */
    function FavoriteServiceFN(FavoriteFactory) {

        this.AddFavorite = AddFavoriteFN;

        ////////////////

        function AddFavoriteFN(userId, categoryId) {
            var favorite = {
                "favoritePK": {
                    "userId": userId,
                    "categoryId": categoryId
                },
                "priority": 1
            };

            FavoriteFactory.save(favorite);

        }
    }

})();

