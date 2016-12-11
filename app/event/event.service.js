/**
 * Created by Ibrahim on 07/12/2016.
 */
(function () {
    'use strict';

    angular
        .module('EventifyApp.event')
        .service('EventService', EventServiceFN);

    EventServiceFN.$inject = ['EventFactory', '$http'];

    /* @ngInject */
    function EventServiceFN(EventFactory, $http) {


        this.getAllEvents = getAllEvents;
        this.addEvent = addEvent;
        this.updateEvent = updateEvent;
        this.deleteEvent = deleteEvent;
        this.getEventByID = getEventByID;
        this.getEventsByOrganization = getEventsByOrganization;
        this.getAddress = getAddress;


        function getAllEvents() {
            return EventFactory.query().$promise;
        }

        function addEvent(event) {
            //event = new EventFactory(event);
            return EventFactory.save(event).$promise;
        }

        function updateEvent(event) {
            EventFactory.update({id: event.id}, event);
            console.log("Updated");
        }

        function deleteEvent(event) {
            return event.$delete();
        }


        function getEventByID(idEvent) {
            //console.log('id event',idEvent);
            // console.log(EventFactory.get({id:idEvent}));
            return EventFactory.get({id: idEvent}).$promise;
        }


        function getEventsByOrganization(idOrganization) {

            return EventFactory.getEventsByOrganization({idOrganization: idOrganization}).$promise;
        }

        function getAddress(latitude, longitude) {
            return $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&key=AIzaSyCpppSvVNQD0XBkVm-r_OcebP7AIxmcixo')
        }
    }

})();

