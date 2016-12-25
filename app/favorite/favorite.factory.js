/**
 * Created by Ibrahim on 25/12/2016.
 */

(function () {
    'use strict';

    angular
        .module('EventifyApp.favorite')
        .factory('FavoriteFactory', FavoriteFactory);

    FavoriteFactory.$inject = ['$resource'];

    /* @ngInject */
    function FavoriteFactory($resource) {
        return $resource('http://localhost:18080/Eventify-web/rest/favorites/:id',
            {id:'@id'},
            {
                'update': { method:'PUT' }
            }
        );

    }

})();

