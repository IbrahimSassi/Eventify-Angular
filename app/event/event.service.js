/**
 * Created by Ibrahim on 07/12/2016.
 */
(function () {
    'use strict';

    angular
        .module('EventifyApp.event')
        .service('EventService', EventServiceFN);

    EventServiceFN.$inject = ['EventFactory','$http'];

    /* @ngInject */
    function EventServiceFN(EventFactory,$http) {


        this.getAllEvents = function () {
            return EventFactory.query().$promise;
        }

        this.addEvent = function (event) {
            //event = new EventFactory(event);
            return EventFactory.save(event).$promise;
        }

        this.updateEvent = function (event) {
            EventFactory.update({ id:event.id },event);
            console.log("Updated");
        }

        this.deleteEvent = function (event) {
            return event.$delete();
        }


        this.getEventByID = function (idEvent) {
            //console.log('id event',idEvent);
            // console.log(EventFactory.get({id:idEvent}));
            return EventFactory.get({id:idEvent}).$promise;
        }

        this.getEventsByOrganization = function (idOrganization) {

            return EventFactory.getEventsByOrganization({idOrganization:idOrganization}).$promise;
        }

        this.getAddress = function (latitude,longitude) {
            return $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+latitude+','+longitude+'&key=AIzaSyCpppSvVNQD0XBkVm-r_OcebP7AIxmcixo')
        }
    }

})();

