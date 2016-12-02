/**
 * Created by Ibrahim on 02/12/2016.
 */

(function () {
    'use strict';

    angular
        .module('EventifyApp.event')
        .controller('EventCreateCtrl', EventCreateCtrlFN);

    EventCreateCtrlFN.$inject = ['EventFactory'];

    /* @ngInject */
    function EventCreateCtrlFN(EventFactory) {
        var vm = this;
        vm.title = 'Create Event';

        // I Choose some attributs Not-Null ,, i will change it later , THIS IS Just an example
        vm.event = {
            title:'',
            theme:'',
            placeNumber: 0,
            latitude :12,
            longitude:12,
            nbViews:1000,
            createdAt:new Date()
        }

        vm.add = function () {
            console.log(vm.event);
            EventFactory.save(null,vm.event);
        }

    }

})();

