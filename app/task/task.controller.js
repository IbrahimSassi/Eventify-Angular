/**
 * Created by killer on 12/8/2016.
 */
(function () {
    'use strict';

    angular
        .module('EventifyApp.task', [
            'ui.router'

        ])
        .config(config)
        .controller('TaskCtrl', TaskCtrl);


    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    TaskCtrl.$inject = ['TaskService', '$state', 'EventService', '$stateParams'];


    /* @ngInject */
    function config($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('taskByOrganizer', {
                url: '/taskByOrganizer/:OrganizerId',
                templateUrl: 'task/views/getTaskByOrganizers.html',
                controller: 'TaskCtrl as task',
                cache: false
            })
            .state('newTask', {
                url: '/task/new',
                templateUrl: 'task/views/CreateTask.html',
                controller: 'TaskCtrl as taskCreate'
            })
            .state('detailTask', {
                url: '/task/detail/:TaskId',
                templateUrl: 'task/views/detailTask.html',
                controller: 'TaskCtrl as taskDetail'
            })


        ;

    };

    /* @ngInject */
    function TaskCtrl(TaskService, $state, EventService, $stateParams) {
        var vm = this;
        var myNewDate = new Date();
        vm.connectedUserId = 1;
        Activate();
        vm.title = 'Task By Organizer';


        vm.TaskDisplayID = $stateParams.TaskId;
        vm.selectedEvent = null;
        vm.task = {
            "taskTitle": "",
            "taskDescription": "",
            "taskStatus": 0,
            "createdAt": myNewDate,
            "organizer": null,
            "event": null
        };


        function Activate() {
            getEvents();
        }


        vm.getTaskByOrganizer = function () {
            vm.OrganizerId = $stateParams.OrganizerId;
            console.log(vm.OrganizerId)
            var myid = vm.OrganizerId;
            console.log("called");
            TaskService.getAllTasksByOrganizer(myid).then(function (data) {
                console.log(data);
                vm.tasks = data;
            })


        };
        function getEvents() {
            console.log(EventService.getAllEvents());
            EventService.getAllEvents().then(function (data) {
                vm.events = data;

            });

        };

        vm.add = function () {
            EventService.getEventByID(vm.selectedEvent).$promise.then(function (data) {
                console.log(data);
                vm.task.event = data;
                TaskService.addTask(vm.task);
                $state.go('taskByOrganizer', {OrganizerId: vm.connectedUserId});

            });


        };


        vm.GetTaskToDisplay = function () {
            TaskService.getTaskById(vm.TaskDisplayID).$promise.then(function (data) {
                vm.TaskToDisplay = data;
            })

        };


    };

})();

