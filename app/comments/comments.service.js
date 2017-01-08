(function () {
    'use strict';

    angular
        .module('EventifyApp.comments')
        .service('CommentsService', CommentsServiceFN);

    CommentsServiceFN.$inject = ['CommentsFactory', '$filter'];


    function CommentsServiceFN(CommentsFactory, $filter) {


        this.getCommentByIdEvent = function (idEvent) {

            return CommentsFactory.query({id: idEvent}).$promise;

        }

        this.getCommentByUserIdAndEventIdService = function (idUserParam, idEventParam) {
            var result = CommentsFactory.getCommentByUserIdAndEventIdFactory({idUser: idUserParam, idEvent: idEventParam});
            return result.$promise;

        }


        this.addCommentService = function (comment) {
             return CommentsFactory.save(comment).$promise;


            }

        this.deleteCommentService = function (iduser,idevent) {
            return CommentsFactory.delete({iduser:iduser,idevent:idevent}).$promise;


        }



    }


})();

