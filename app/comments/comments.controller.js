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
    CommentsCtrl.$inject = ['CommentsService', '$state','$stateParams'];
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


        ;

    };
    /**End of Route Config**/

    /** Controller CommentsCtrl FUNCTION
     *
     * @param commentsService
     * @param $state
     */
    function CommentsCtrl(CommentsService, $state,$stateParams) {


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


        // vm.getCommentByIdAndEventIdCTRL = function (idUserCTRL, idEventCTRL) {
        //
        // }

    };

    /**End UserCtrlFunction**/

})();
