/**
 * Created by Ibrahim on 09/12/2016.
 */
(function () {
    'use strict';

    angular
        .module('EventifyApp.category',[])
        .service('CategoryService', CategoryService);

    CategoryService.$inject = ['CategoryFactory'];

    /* @ngInject */
    function CategoryService(CategoryFactory) {
        this.getAllCategories = getAllCategories;

        ////////////////

        function getAllCategories() {
            return CategoryFactory.query().$promise;
        }
    }

})();


