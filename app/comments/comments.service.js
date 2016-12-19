(function () {
    'use strict';

    angular
        .module('EventifyApp.comments')
        .service('CommentsService', CommentsServiceFN);

    CommentsServiceFN.$inject = ['CommentsFactory', '$filter'];


    function CommentsServiceFN(CommentsFactory, $filter) {


        this.getCommentById = function (idEvent) {

            return CommentsFactory.get({id: idEvent});


        }

        this.getCommentByUserIdAndEventIdService = function (idUserParam, idEventParam) {
            var result = CommentsFactory.getCommentByUserIdAndEventIdFactory({idUser: idUserParam, idEvent: idEventParam});
            return result.$promise;

        }
    }


})();

