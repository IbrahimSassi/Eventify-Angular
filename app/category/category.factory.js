/**
 * Created by Ibrahim on 09/12/2016.
 */
(function () {
    'use strict';

    angular
        .module('EventifyApp.category')
        .factory('CategoryFactory', CategoryFactoryFN);

    CategoryFactoryFN.$inject = ['$resource'];

    /* @ngInject */
    function CategoryFactoryFN($resource) {


        return $resource('http://localhost:18080/Eventify-web/rest/categories/:id',
            {id:'@id'},
            {
                'update': { method:'PUT' }
            }
        );

        ////////////////

    }

})();

