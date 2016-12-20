/**
 * Created by Ibrahim on 20/12/2016.
 */
(function () {
    'use strict';

    angular
        .module('EventifyApp.priceFilter',['EventifyApp.event'])
        .filter('priceFilter', priceFilter);

    function priceFilter(EventService) {
        return priceFilterFilter;

        ////////////////

        function priceFilterFilter(events,min,max) {
            console.log("hello FROM filter",min,max);

            // if(events){
            //     events.forEach(function (event) {
            //         EventService.getMyTickets(event.id).then(function (data) {
            //             if (data.length > 0) {
            //                 // console.log('tickets before',data);
            //                 event.tickets = data;
            //             }
            //         });
            //     })
            //
            // }
            return events;
        }
    }

})();

