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
    TaskCtrl.$inject = ['TaskService', '$state', 'EventService', '$stateParams', '$timeout', 'DiscussionService'];


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
            .state('discussTask', {
                url: '/task/discuss/:DTaskId',
                templateUrl: 'task/views/discussion.html',
                controller: 'TaskCtrl as taskDiscussion'
            })
            .state('taskByEvent', {
                url: '/taskByEvent/:EventId',
                templateUrl: 'task/views/getTaskByEvent.html',
                controller: 'TaskCtrl as taskEvent',
                cache: false
            })
            .state('editTask', {
                url: '/task/edit/:TaskEditId',
                templateUrl: 'task/views/editTask.html',
                controller: 'TaskCtrl as taskEdit'
            })


        ;

    };

    /* @ngInject */
    function TaskCtrl(TaskService, $state, EventService, $stateParams, $timeout, DiscussionService) {
        var vm = this;
        var myNewDate = new Date();
        vm.connectedUserId = 1;
        Activate();
        vm.title = 'Task By Organizer';
        vm.EventId = $stateParams.EventId;
        vm.TaskEditId=$stateParams.TaskEditId;

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
            console.log(vm.OrganizerId);
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
                vm.getTaskByEvent();
                setTimeout(function () {
                    $state.go('taskByEvent', {EventId: vm.task.event.id});

                },1000);

            });


        };


        vm.GetTaskToDisplay = function () {
            TaskService.getTaskById(vm.TaskDisplayID).$promise.then(function (data) {
                vm.TaskToDisplay = data;
            })

        };
        vm.DiscussionInitializer = function () {


            vm.DTaskId = $stateParams.DTaskId;
            DiscussionService.getDiscussionBytask(vm.DTaskId).then(function (data) {
                vm.Disucssions = data;


                console.log(vm.Disucssions);
                console.log("called");
            });


            // setInterval(function () {
            //
            //     vm.GetDiscussions=function () {
            //         vm.DTaskId=$stateParams.DTaskId;
            //         DiscussionService.getDiscussionBytask(vm.DTaskId).then(function (data){
            //             vm.Disucssions=data;
            //             console.log(vm.Disucssions);
            //             console.log("called");
            //         });
            //
            //
            //     };
            //
            // },1000);

        };
        vm.sendMessage = function (id) {

            vm.mymessage = {
                "status": 1,
                "messageDate": new Date(),
                "user": {
                    "id": id

                },
                "task": {
                    "id": vm.DTaskId

                },

                "messagedata": vm.MesageText
            };
            vm.MesageText = null;
            DiscussionService.addDiscussion(vm.mymessage).then(function () {
                vm.DiscussionInitializer();
            });

        };
        vm.SetCompleted = function (id) {
            TaskService.SetTaskStatusCompleted(id);
            //console.log(id);
            $state.reload();
        };

        vm.getTaskByEvent = function () {

            console.log("called");
            TaskService.GeTasksByEvent(vm.EventId).then(function (data) {
                console.log(data);
                vm.evtasks = data;
            })
            // $state.reload();
        };


        vm.deleteTask = function (task) {
            TaskService.deleteTask(task);
            $state.reload();

        }



        vm.GetTaskToEdit = function () {
            TaskService.getTaskById(vm.TaskEditId).$promise.then(function (data) {
                vm.TaskToEdit = data;
                EventService.getAllEvents().then(function (data) {
                    console.log("called now");
                    console.log(data);
                    vm.myevents = data;

                });
              //  vm.selectedEvent=TaskToEdit.event.id;
            })

        };



        vm.edit = function () {
            EventService.getEventByID(vm.selectedEvent).$promise.then(function (data) {
               // console.log(data);
               //  vm.TaskEditId=$stateParams.TaskEditId;
                vm.TaskToEdit.event = data;
                TaskService.updateTask(vm.TaskToEdit);

                vm.getTaskByEvent();
                setTimeout(function () {
                    $state.go('taskByEvent', {EventId: vm.selectedEvent});

                },1000);



            });


        };












    };

})();

