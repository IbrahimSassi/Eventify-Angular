/**
 * Created by killer on 12/8/2016.
 */

(function () {
    'use strict';

    angular
        .module('EventifyApp.task')
        .factory('TaskFactory', TaskFactory);

    TaskFactory.$inject = ['$resource'];

    /* @ngInject */
    function TaskFactory($resource) {
        return $resource('http://localhost:18080/Eventify-web/rest/Tasks/:id',
            {id: '@id'},
            {
                'update': { method:'PUT' },
                'getTasksByOrganizerId': {
                    url: 'http://localhost:18080/Eventify-web/rest/Tasks/TasksByOganizert/:OrganizerId',
                    method: 'GET',
                    params: {
                        OrganizerId: '@OrganizerId',
                    },
                    isArray: true


                },

                'TasksByEvent': {
                        url: 'http://localhost:18080/Eventify-web/rest/Tasks/TasksByEvent/:EventId',
                            method: 'GET',
                            params: {
                                EventId: '@EventId',
                        },
                        isArray: true

                },
                'AssignTask': {
                    url: 'http://localhost:18080/Eventify-web/rest/Tasks/AssignTask/:OrganizerId/:TaskId',
                    method: 'GET',
                    params: {
                        OrganizerId: '@OrganizerId',
                        TaskId: '@TaskId',
                    },
                    isArray: false

                },
                'TaskStatusCompleted': {
                    url: 'http://localhost:18080/Eventify-web/rest/Tasks/taskStatusCompleted/:TaskId',
                    method: 'GET',
                    params: {

                        TaskId: '@TaskId',
                    },
                    isArray: false

                }












            }
        );
    }

})();


