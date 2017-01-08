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


        this.getAllEvents = getAllEventsFN;
        this.addEvent = addEventFN;
        this.updateEvent = updateEventFN;
        this.deleteEvent = deleteEventFN;
        this.getEventByID = getEventByIDFN;
        this.getEventsByOrganization = getEventsByOrganizationFN;
        this.getAddress = getAddressFN;
        this.getMyRate = getMyRateFN;
        this.getMyTickets = getMyTicketsFN;
        this.getNearbyEvents = getNearbyEventsFN;
        this.searchWithVoice = searchWithVoiceFN;


        function getAllEventsFN() {
            return EventFactory.query().$promise;
        }

        function addEventFN(event) {
            //event = new EventFactory(event);
            return EventFactory.save(event).$promise;
        }

        function updateEventFN(event) {
            console.log(EventFactory.update({id: event.id}, event));
            console.log("Updated");
        }

        function deleteEventFN(event) {
            return event.$delete();
        }


        function getEventByIDFN(idEvent) {
            //console.log('id event',idEvent);
            // console.log(EventFactory.get({id:idEvent}));
            return EventFactory.get({id: idEvent});
        }


        function getEventsByOrganizationFN(idOrganization) {

            return EventFactory.getEventsByOrganization({idOrganization: idOrganization}).$promise;
        }

        function getAddressFN(latitude, longitude) {
            return $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&key=AIzaSyCpppSvVNQD0XBkVm-r_OcebP7AIxmcixo')
        }

        function getMyRateFN(id) {

            // console.log(EventFactory.getMyRate({idEvent:id}).$promise);
            return EventFactory.getMyRate({idEvent: id}).$promise;
        }

        function getMyTicketsFN(id) {
            return EventFactory.getMyTickets({idEvent: id}).$promise;
        }

        function getNearbyEventsFN(long, lat) {
            return EventFactory.query({longitude: long, latitude: lat}).$promise;

        }


        function searchWithVoiceFN(text) {

            // text = text.split(' ').join('%20');
            // console.log(text);
            return $.ajax({
                    url: "https://api.wit.ai/message",
                    data: {
                        'v': '20161222',
                        'q': text,
                        'access_token': 'WWKAQ5PZQ6OETNII4VSGLI6VX4E2EEPV'
                    },
                    dataType: 'jsonp',
                    jsonp: "callback",
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + 'IXK2YYA6CUYKKEQBJ6KHV56Z5B4Z3UX3'
                    }
                }
            );

        }


    }

})();

