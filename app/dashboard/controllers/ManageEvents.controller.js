/**
 * Created by Ibrahim on 10/12/2016.
 */

(function () {
    'use strict';

    angular
        .module('EventifyApp.dashboard')
        .controller('ManageEventsCtrl', ManageEventsCtrl);


    ManageEventsCtrl.$inject = ['EventService','$stateParams','$state'];

    /* @ngInject */
    function ManageEventsCtrl(EventService,$stateParams,$state) {
        var vm = this;
        vm.title = 'DashboardCtrl';
        // console.log("salem From Manage Events")
        // console.log(MyEventsService.getMyEvents(1));

        var editedEventId = $stateParams.id;

        vm.datetimepickerStart = {
            date: new Date()
        };
        vm.datetimepickerEnd = {
            date: new Date()
        };

        this.openCalendar = function(e,datetimepicker) {
            // e.preventDefault();
            // e.stopPropagation();

            vm[datetimepicker].open = true;
        };


        if(editedEventId)
        {
            // console.log($stateParams.id);
            EventService.getEventByID(editedEventId).then(function (data) {
                console.log(data);
                vm.editedEvent = data;

                vm.editedEvent.startTime = new Date(vm.editedEvent.startTime);
                vm.editedEvent.endTime = new Date(vm.editedEvent.endTime);


            })
        }

        vm.getMyEvents = function () {
            EventService.getEventsByOrganization(1).then(function (data) {
                // console.log(data);
                vm.myEvents = data;
            });

        }


        vm.delete = function (event) {
            EventService.deleteEvent(event).then(function (){
                vm.getMyEvents();
            });
        };


        vm.update = function () {
            EventService.updateEvent(vm.editedEvent);
            $state.go('administration.events')
        };

        vm.unpublish = function (event) {
            event.eventState= "UNPUBLISHED";
            EventService.updateEvent(event);
        }

        vm.publish = function (event) {
            event.eventState= "PUBLISHED";
            EventService.updateEvent(event);

        }


    }

})();

