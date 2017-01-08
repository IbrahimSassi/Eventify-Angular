/**
 * Created by Hakim Mliki on 07/12/2016.
 * PS : NEVER NEVER NEVER TOUCH THIS FILE THANK YOU
 */
(function () {
    'use strict';

    angular
        .module('EventifyApp.user')
        .factory('UserFactory', UserFactory);

    UserFactory.$inject = ['$resource'];


    /* @ngInject */
    /**
     *UserFactory
     * @param $resource
     * @returns {{secured: *}}
     * @constructor
     */
    function UserFactory($resource) {
        this.secured = function (token) {
            return $resource('http://localhost:18080/Eventify-web/rest/users/:id',

                {
                    id: '@id'
                }, {
                    'update': {
                        method: 'PUT',
                        headers: {
                            'Authorization': 'Bearer ' + token
                        }
                    },
                    'signIn': {
                        url: 'http://localhost:18080/Eventify-web/rest/users/:username/:pwd',
                        method: 'GET',
                        params: {
                            username: '@username',
                            pwd: '@pwd'
                        },
                        transformResponse: function (data) {
                            return {
                                authToken: data
                            };
                        },


                    },
                    'query': {
                        method: 'GET',
                        isArray: true,
                        headers: {
                            'Authorization': 'Bearer ' + token
                        }
                    },
                    'confirmToken': {
                        url: 'http://localhost:18080/Eventify-web/rest/users/confirm/:tokenToConfirm',
                        method: 'GET',
                        params: {
                            id: null,
                            tokenToConfirm: '@tokenToConfirm',

                        },
                        headers: {
                            'Authorization': 'Bearer ' + token
                        }
                    },
                    'changePassword': {
                        url: 'http://localhost:18080/Eventify-web/rest/users/:oldPwd/:newPwd',
                        method: 'PUT',
                        params: {
                            id: null,
                            oldPwd: '@oldPwd',
                            newPwd: '@newPwd'
                        },
                        headers: {
                            'Authorization': 'Bearer ' + token
                        }


                    }

                }
            );
        }
        return {
            secured: this.secured
        };


    }

})();