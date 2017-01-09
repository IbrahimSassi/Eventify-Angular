/**
 * Created by killer on 12/8/2016.
 */


(function () {
    'use strict';

    angular
        .module('EventifyApp.task')
        .service('TaskService', TaskServiceFN);

    TaskServiceFN.$inject = ['TaskFactory'];

    /* @ngInject */


    function TaskServiceFN(TaskFactory) {
        this.addTask = addTaskFn;
        this.getTaskById = getTaskByIdFn;
        this.updateTask = updateTaskFn;
        this.deleteTask = deleteTaskFn;
        this.getAllTasksByOrganizer = getAllTasksByOrganizerFn;
        this.GeTasksByEvent = GeTasksByEventFn;
        this.AssignTaskToOrganizer = AssignTaskToOrganizerFn;
        this.SetTaskStatusCompleted = SetTaskStatusCompletedFn;
        function addTaskFn(task) {

            return TaskFactory.save(task).$promise;
        }


        function getTaskByIdFn(taskId) {


            return TaskFactory.get({id: taskId});

        }

        function updateTaskFn(task) {
            TaskFactory.update({id: task.id}, task);
            console.log("Updated");
        }


        function deleteTaskFn(task) {
            return task.$delete();
        }


        function getAllTasksByOrganizerFn(OrganizerId) {
            // console.log(id);
            // console.log(TaskFactory.query({id:id}))

            return TaskFactory.getTasksByOrganizerId({OrganizerId: OrganizerId}).$promise;
        }


        function GeTasksByEventFn(EventId) {
            return TaskFactory.TasksByEvent({EventId: EventId}).$promise;

        }

        function AssignTaskToOrganizerFn(OrganizerId, TaskId) {
            TaskFactory.AssignTask({OrganizerId: OrganizerId, TaskId: TaskId});

        }

        function SetTaskStatusCompletedFn(TaskId) {
            TaskFactory.TaskStatusCompleted({TaskId: TaskId});
            //console.log(TaskId)
        }





    }


})();

