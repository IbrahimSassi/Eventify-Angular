/**
 * Created by Ibrahim on 10/12/2016.
 */

(function () {
    'use strict';

    angular
        .module('EventifyApp.dashboard')
        .controller('ManageEventsCtrl', ManageEventsCtrl);


    ManageEventsCtrl.$inject = ['EventService'];

    /* @ngInject */
    function ManageEventsCtrl(EventService) {
        var vm = this;
        vm.title = 'DashboardCtrl';
        // console.log("salem From Manage Events")
        // console.log(MyEventsService.getMyEvents(1));


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


    }

})();

