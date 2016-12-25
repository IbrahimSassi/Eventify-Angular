/**
 * Created by Ibrahim on 25/12/2016.
 */
(function () {
    'use strict';

    angular
        .module('EventifyApp.favorite')
        .controller('FavoriteCtrl', FavoriteCtrl);

    FavoriteCtrl.$inject = ['FavoriteService', 'CategoryService'];

    /* @ngInject */
    function FavoriteCtrl(FavoriteService, CategoryService) {
        var vm = this;
        vm.title = 'FavoriteCtrl';
        vm.currentUser = 2;

        activate();


        vm.favorites = {};
        CategoryService.getAllCategories().then(function (data) {
            vm.categories = data;
        });

        vm.addFavorite = function () {
            vm.categories.forEach(function (cad) {

                if(vm.favorites[cad.id]){
                    FavoriteService.AddFavorite(vm.currentUser,cad.id);
                }

            });

        }

        ////////////////

        function activate() {
        }
    }

})();

