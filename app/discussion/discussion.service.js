/**
 * Created by killer on 12/30/2016.
 */
(function () {
    'use strict';

    angular
        .module('EventifyApp.discussion')
        .service('DiscussionService', DiscussionServiceFN);

    DiscussionServiceFN.$inject = ['DiscussionFactory'];



    function DiscussionServiceFN(DiscussionFactory) {
        this.addDiscussion = addDiscussionFN;
        this.getDiscussionBytask=getDiscussionBytaskIdFN;
        function addDiscussionFN(discussion) {

            return DiscussionFactory.save(discussion).$promise;
        }


    function getDiscussionBytaskIdFN(taskId) {
        return DiscussionFactory.query({id: taskId}).$promise;

    }












    }


})();