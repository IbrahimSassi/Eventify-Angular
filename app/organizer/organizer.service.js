/**
 * Created by ninou on 12/24/2016.
 */

(function () {
    'use strict';

    angular
        .module('EventifyApp.organizer')
        .service('OrganizerService', OrganizerServiceFN);

    OrganizerServiceFN.$inject = ['OrganizerFactory', '$http'];

    /* @ngInject */
    function OrganizerServiceFN(OrganizerFactory, $http) {


        this.getAllOrganizersByUserIdAndOrganizationId = getAllOrganizersFN;





        function getAllOrganizersFN(idUser, idOrganization) {
            console.log("pffff",OrganizerFactory.getOrganizer({idUser: idUser}));
            return OrganizerFactory.query({idUser: idUser}).$promise;
        }


       this.addOrganizer= function addOrganizertFN(idUser, idOrganization) {
            var organizer = {
                "organizerPK": {
                    "idUser": idUser,
                    "idOrganization": idOrganization
                },
                "state" : "SENT"
            };
console.log("orgggg", organizer);
           OrganizerFactory.save(organizer);

        }



        this.AcceptOrganizer= function updateOrganizerFN(idUser, idOrganization) {
            var organizer = {
                "organizerPK": {
                    "idUser": idUser,
                    "idOrganization": idOrganization
                },
                "state" : "ACCEPTED"
            };
            console.log("updati haya hal organizer ", organizer);
            OrganizerFactory.update(organizer);

        }





        this.RefuseOrganizer= function RefuseOrganizerFN(idUser, idOrganization) {
            console.log("Refuse aada haya etape zero ", organizer);
            var organizer = {
                "organizerPK": {
                    "idUser": idUser,
                    "idOrganization": idOrganization
                },
                "state" : "REFUSED"
            };
            console.log("Refuse aada haya ", organizer);
            OrganizerFactory.update(organizer);

        }









        this.removeOrganizer = function removeOrganizerFN(idUser, idOrganization) {
            // console.log(WishlistFactory.delete({userId:UserId,eventId:eventId}));
            return OrganizerFactory.delete({idUser: idUser, idOrganization: idOrganization}).$promise;
        }


    }

})();

