(function () {
    'use strict';

    /**My Module init**/
    angular
        .module('EventifyApp.comments', [
            'ui.router',
        ])
        .config(config)
        .controller('CommentsCtrl', CommentsCtrl);
    /**End My Module Init**/

    /**Injection**/
    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    CommentsCtrl.$inject = ['CommentsService', '$state','$stateParams','$rootScope'];
    /**End Of Injection**/


    /** Route Config **/
    function config($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('listComments', {
                url: '/comments',
                templateUrl: '../comments/views/list.comments.view.html',
                controller: 'CommentsCtrl as comments'
            })
            .state('Comments', {
                url: '/comments/:idUserCTRL/:idEventCTRL',
                templateUrl: '../comments/views/user-comment-event.comments.view.html',
                controller: 'CommentsCtrl as comments'
            })
            .state('addComments', {
                url: '/addComments',
                templateUrl: '../comments/views/create-comment.view.html',
                controller: 'CommentsCtrl as comments'
            })


        ;

    };
    /**End of Route Config**/

    /** Controller CommentsCtrl FUNCTION
     *
     * @param commentsService
     * @param $state
     */
    function CommentsCtrl(CommentsService, $state,$stateParams,$rootScope) {


        var vm = this;

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



        vm.getCommentByIdCTRL = function (idEventCTRL) {
            vm.ListComments = CommentsService.getCommentById(idEventCTRL);
        }

        vm.getCommentByIdCTRL = function (idUser,idEventCTRL) {
            vm.addComments = CommentsService.addComment(idUser,idEventCTRL);
        }
        // vm.getCommentByIdAndEventIdCTRL = function (idUserCTRL, idEventCTRL) {
        //
        // }

        if ($rootScope.currentUser != null) {
       vm.comment = {
            "user": null,
            "event": null,
            "commentPK": {
                "idUser": $rootScope.currentUser.User.id,
                "idEvent": 2
            },

        };

        }
        vm.addCommentCTRL = function () {

            CommentsService.addCommentService(vm.comment);

        }



        vm.getCommentByEventId = function () {

            CommentsService.getCommentByIdEvent(2).then(function (data) {
                vm.commentList = data;

            });
        }

        vm.deleteComment = function (iduser,idevent) {

            CommentsService.deleteCommentService(iduser,idevent).then(function (data) {
                console.log("tfasakh");

            });
        }




    };

    /**End UserCtrlFunction**/

})();
