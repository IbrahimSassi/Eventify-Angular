/**
 * Created by Ibrahim on 25/12/2016.
 */
(function () {
    'use strict';

    angular
        .module('EventifyApp.event')
        .controller('DetailEvent', DetailEvent);


    DetailEvent.$inject = [
        'EventService',
        '$state',
        'CategoryService',
        '$stateParams',
        'WishlistService',
        'CommentsService',
        '$rootScope',
        'ratesService',
        'TicketService'
    ];


    /* @ngInject */
    function DetailEvent(EventService,
                         $state,
                         CategoryService,
                         $stateParams,
                         WishlistService,
                         CommentsService,
                         $rootScope,
                         ratesService,
                         TicketService) {
        //On Init Start
        var vm = this;
        vm.title = 'Event List';


        vm.initDetail = function () {
            vm.getSelectedEvent();
            vm.getCommentByEventId();
            vm.getEventTickets();
        };


        // ** Init end **//


        //** Shared start **/

        // Getting Categories to list them in the listbox
        vm.getCategories = function () {
            CategoryService.getAllCategories().then(function (data) {
                vm.categories = data;
                // vm.categories.forEach(function (ca) {
                //     // console.log("categories", ca);
                //
                // })
            });
        };


        vm.getRateForEvent = function (id) {
            return EventService.getMyRate(id);
        };

        //** Shared end **/


        // ** Event Detail start **/


        //getting event id passed in params to get event
        vm.eventId = $stateParams.eventId;
        vm.userConnectedId = 1;


        vm.getSelectedEvent = function () {
            // console.log(eventId);
            EventService.getEventByID(vm.eventId).$promise.then(function (data) {
                vm.eventToDisplay = data;
                vm.initMap();

                vm.getRateForEvent(vm.eventToDisplay.id).then(function (data) {
                    if (data.id)
                        vm.eventToDisplay.rateAvg = roundDecimal(data.rateAvg, 1);
                });

                // console.log(vm.eventToDisplay);
                // console.log(vm.eventToDisplay.latitude,vm.eventToDisplay.longitude);


                // Longitude and latitude to Adress
                EventService.getAddress(vm.eventToDisplay.latitude, vm.eventToDisplay.longitude).then(function (data) {
                    // console.log('adress',data.data.results[0]);
                    vm.adress = data.data.results[0].formatted_address;
                }, function (err) {
                    console.log('error', err);
                });


                EventService.getMyTickets(vm.eventToDisplay.id).then(function (data) {
                    if (data.length > 0) {
                        // console.log('tickets before',data);

                        vm.eventToDisplay.tickets = data;
                    }
                });
                console.log('ticket for selected', vm.eventToDisplay)

            });


        };


        vm.giveHeart = function (event) {
            // vm.eventToDisplay.nbViews  = vm.eventToDisplay.nbViews + 1;
            // console.log(vm.eventToDisplay.nbViews);
            vm.loveIt = !vm.loveIt;

            if (vm.loveIt) {
                event.nbViews = event.nbViews + 1;

            }
            else {
                event.nbViews = event.nbViews - 1;

            }
            // console.log(vm.eventToDisplay.nbViews);

            EventService.updateEvent(event);
        };


        //VerifyWishlist
        WishlistService.getWishlistsByUserAndEvent(vm.userConnectedId, vm.eventId).then(function (data) {
            if (data.wishlistPK) {
                console.log('wishlist', data);
                vm.addedWishlist = true;

            }
        });


        vm.addWishlist = function () {
            console.log('eventId', vm.eventId)
            console.log('userId', vm.userConnectedId);

            vm.addedWishlist = !vm.addedWishlist;


            if (vm.addedWishlist) {
                WishlistService.addToWishlist(vm.userConnectedId, vm.eventId);
            }
            else {
                WishlistService.removeFromWishlist(vm.userConnectedId, vm.eventId);

            }
        };


        // ** Event Detail end **/


        function roundDecimal(nombre, precision) {
            var precision = precision || 2;
            var tmp = Math.pow(10, precision);
            return Math.round(nombre * tmp) / tmp;
        }


        vm.getNumber = function (num) {
            return new Array(num);
        };


        vm.initMap = function () {


            if (vm.eventId) {

                var mapOptions = {
                    center: new google.maps.LatLng(vm.eventToDisplay.latitude, vm.eventToDisplay.longitude),
                    zoom: 13
                };
                console.log("here", mapOptions)
            }
            else {
                var mapOptions = {
                    center: new google.maps.LatLng(-33.8688, 151.2195),
                    zoom: 13
                };

            }


            var map = new google.maps.Map(document.getElementById('map-canvas'),
                mapOptions);

            var autocomplete = new google.maps.places.Autocomplete(input);
            autocomplete.bindTo('bounds', map);

            var infowindow = new google.maps.InfoWindow();
            var marker = new google.maps.Marker({
                draggable: true,
                map: map,
                anchorPoint: new google.maps.Point(0, -29)
            });

        };


        //Mourad Workk


        vm.idUserCTRLParamUrl = $stateParams.idUserCTRL;
        vm.idEventCTRLParamUrl = $stateParams.idEventCTRL;

        if (vm.idUserCTRLParamUrl && vm.idEventCTRLParamUrl) {
            CommentsService.getCommentByUserIdAndEventIdService(vm.idUserCTRLParamUrl, vm.idEventCTRLParamUrl).then(function (success) {
                    vm.Comment = success;
                },
                function (error) {
                    vm.Comment = null;
                    console.log(error);
                }
            );
            console.error(vm.Comment);
        }


        if ($rootScope.currentUser != null) {
            vm.comment = {
                "user": null,
                "event": null,
                "contain": "",
                "commentPK": {
                    "idUser": $rootScope.currentUser.User.id,
                    "idEvent": vm.eventId
                },

            };

        }
        vm.addCommentCTRL = function () {

            CommentsService.addCommentService(vm.comment).then(function () {
                vm.getCommentByEventId();
            });


            vm.myRate = {
                "ratePK": {
                    "idUser": $rootScope.currentUser.User.id,
                    "idEvent": vm.eventId
                },
                "note": ((parseInt(vm.rate.price) + parseInt(vm.rate.organization) + parseInt(vm.rate.staff) + parseInt(vm.rate.place)) /4) ,
            };
            ratesService.addRate(vm.myRate)

        }


        vm.getCommentByEventId = function () {

            CommentsService.getCommentByIdEvent(vm.eventId).then(function (data) {
                vm.commentList = data;

                console.log(vm.commentList)

            });
        }

        vm.deleteComment = function (iduser, idevent) {

            CommentsService.deleteCommentService(iduser, idevent);

            vm.getCommentByEventId();
        }

        ratesService.getRateByEvent(vm.eventId).then(function (data) {
            console.log("rate",data.data);
        })










        //Firas Worrkkkkkkkkkkkkk*******************************************************************************************************************************************

        /**List Tickets**/
        vm.getEventTickets = function () {
            console.log("called", TicketService.getEventTickets(vm.eventId));
            TicketService.getEventTickets(vm.eventId).then(function (data) {
                console.log("Tickets: ", data);
                vm.tickets = data;
            });
        };


        /**Store Real Ticket Numbers*/

        TicketService.getEventTickets(vm.eventId).then(function (data) {
            vm.realtickets = data;
        });
        /**END Store Ticket Numbers*/

        var totals=0;
        var sales;
        var salesCount=0;

        /** Update Ticket Numbers */
        vm.updatehahi = function () {
            TicketService.getEventTickets(vm.eventId).then(function (data) {
                vm.ticketss = data;
                // vm.data = vm.events.slice(0, 3);





                vm.ticketss.forEach(function (ticket) {
                    console.log("ti ahaya mrigla:",ticket);
                    if( ((ticket.nbTickets - parseInt(vm.ticketnumber[ticket.id]))>0) || ((ticket.nbTickets - parseInt(vm.ticketnumber[ticket.id]))==0))
                    {


                        ticket.nbTickets = ticket.nbTickets - parseInt(vm.ticketnumber[ticket.id]);

                        TicketService.updateNbTicket(ticket);


                        totals =  totals+((parseInt(vm.ticketnumber[ticket.id]))*ticket.priceTicket);
                        console.log("totale: ",totals);

                        sales = {

                            total:totals,


                        }


                        sessionStorage.sales = angular.toJson(sales);
                        $state.go('reservateForEvent', {eventIDD: vm.eventId,tickets:vm.realtickets});
                    }
                    else{
                        console.log("waywaaaa");
                    }


                });

            });



        };


        //Firas Worrkkkkkkkkkkkkk***********************************************************************************************************************


    };

})();

