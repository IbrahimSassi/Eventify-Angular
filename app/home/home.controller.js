/**
 * Created by Ibrahim on 09/12/2016.
 */

(function () {
    'use strict';

    angular
        .module('EventifyApp.home',[
            'ui.router',


        ])
        .config(config)
        .controller('HomeCtrl', HomeCtrlFN)        .run(function ($rootScope, $state, UserService) {
        $rootScope.$on("$stateChangeStart", function(event, toState){
            if (toState.authenticate && !UserService.isAuth()){
                $rootScope.currentUser=null;
                $state.transitionTo("loginUser");
                event.preventDefault();
            }
            else if(!UserService.isAuth())
            {
                $rootScope.currentUser=null;
            }
            else
            {
                $rootScope.currentUser=UserService.extractTokenData(UserService.getToken());
            }
        });
    });


    config.$inject = ['$stateProvider','$urlRouterProvider'];
    HomeCtrlFN.$inject = ['EventService'];



    /* @ngInject */
    function config ($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('home',{
                url:'/home',
                templateUrl:'home/views/home.view.html',
                controller: 'HomeCtrl as home',
                cache:false
            })
        ;

    };

    /* @ngInject */
    function HomeCtrlFN(EventService) {
        var vm = this;
        vm.title = 'Home';

        //To Change !!!
        EventService.getAllEvents().then(function (data) {
            vm.popularEvents = data;
            console.log(vm.popularEvents);
            
            vm.popularEvents.forEach(function (event) {
                console.log(event.startTime);
                event.startTime =moment(new Date(event.startTime)).calendar(null, {
                    sameDay: '[Today]',
                    nextDay: '[Tomorrow]',
                    nextWeek: 'dddd',
                    lastDay: '[Yesterday]',
                    lastWeek: '[Last] dddd',
                    sameElse: 'DD/MM/YYYY'
                });


                console.log(event.startTime)
            })
        });






    };

})();

