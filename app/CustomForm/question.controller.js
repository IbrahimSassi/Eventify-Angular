/**
 * Created by Ibrahim on 07/12/2016.
 */
(function () {
    'use strict';

    angular
        .module('EventifyApp.question',[
            'ui.router',
            'dndLists',


        ])
        .config(config)
        .controller('QuestionCtrl', QuestionCtrlFN);


    config.$inject = ['$stateProvider','$urlRouterProvider'];
    QuestionCtrlFN.$inject = ['QuestionService','$state','$scope','AttributService'];



    /* @ngInject */
    function config ($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('createQuestion',{
                url:'/CustomForm',
                templateUrl:'CustomForm/views/createCustomForm.html',
                controller: 'QuestionCtrl as form',
                cache:false
            })
        ;

    };

    /* @ngInject */
    function QuestionCtrlFN(QuestionService,$state,$scope,AttributService) {
        var vm = this;
        vm.title = 'Create Custom Form';

        // vm.QuestionTypes = [
        //     {
        //         id:1,
        //         type:"Short_Anwser",
        //         multiple:false
        //
        //     },
        //     {
        //         id:2,
        //         type:"Paragraphe",
        //         multiple:false
        //
        //     },
        //     {
        //         id:3,
        //         type:"RadioBox",
        //         multiple:true
        //
        //     },
        //     {
        //         id:4,
        //         type:"CheckBox",
        //         multiple:true
        //
        //     },
        //     {
        //         id:5,
        //         type:"Date",
        //         multiple:false
        //
        //     },
        //     {
        //         id:6,
        //         type:"DropdownList",
        //         multiple:true
        //
        //     }
        // ];

        vm.addQuestion = function () {
            // QuestionService.addQuestion(vm.CustomForm);
            // console.log($scope.models.form.A);
            $scope.models.form.A.forEach(function (data) {
                //console.log("question",data);

                if(data.multiple){

                    vm.question = {
                        "questionType" :data.type,
                        "questionDescription" :data.name,
                        "questionCategory": "RegistrationForm",
                        "status": 1,
                        "questionDate": new Date(),
                        "order": 1,
                        "event": {
                            id:1
                        }
                    };


                    QuestionService.addQuestion(vm.question).$promise.then(function (questionAdded) {
                        console.log("multiple question added",questionAdded);

                        data.attributs[0].forEach(function (response) {
                            console.log('attribut',response);

                            vm.attribut= {
                                "attributValue": response.name,
                                "duplicated": false,
                                "question": {
                                    "id":questionAdded.id
                                }

                            };


                            AttributService.addAttribut(vm.attribut)
                        });
                    });


                }
                else
                {
                    vm.question = {
                        "questionType" :data.type,
                        "questionDescription" :data.name,
                        "questionCategory": "RegistrationForm",
                        "status": 1,
                        "questionDate": new Date(),
                        "order": 1,
                        "event": {
                            id:1
                        }
                    };
                    QuestionService.addQuestion(vm.question).$promise.then(function (questionAdded) {
                        console.log("mouch multiple question added",questionAdded);

                        vm.attribut= {
                            "attributValue": data.name,
                            "duplicated": false,
                            "question": {
                                "id":questionAdded.id
                            }

                        };
                        AttributService.addAttribut(vm.attribut)

                    });



                }

            });
            console.log("added");

        };














        // TEST Drag And Drop

        $scope.var = "test";


        $scope.models = {
            selected: null,
            templates: [
                {multiple:false,name:"Short_Anwser",type: "Short_Anwser", id: 1},
                {multiple:false,name:"Paragraphe",type: "Paragraphe", id: 2},
                {multiple:false,name:"Date",type: "Date", id: 3},
                {multiple:true,name:"RadioBox",type: "RadioBox", id: 4, attributs: [[{
                    "name":"Attribut",
                    "type": "Attribut",
                    "id": "1"
                }]]},
                {multiple:true,name:"CheckBox",type: "CheckBox", id: 5, attributs: [[{
                    "name":"Attribut",
                    "type": "Attribut",
                    "id": "1"
                }]]},
                {multiple:true,name:"DropdownList",type: "DropdownList", id: 6, attributs: [[{
                    "name":"Attribut",
                    "type": "Attribut",
                    "id": "1"
                }]]},
                {multiple:false,name:"Attribut",type: "Attribut", id: 7},

            ],
            form: {
                "A": [
                    {
                        "multiple":true,
                        "name":"RadioBox",
                        "type": "RadioBox",
                        "id": 11,
                        "attributs": [
                            [
                                {
                                    "name":"Attribut",
                                    "type": "Attribut",
                                    "id": "1"
                                }

                            ]

                        ]
                    },
                ]
            }
        };

        $scope.$watch('models.form', function(model) {
            $scope.modelAsJson = angular.toJson(model, true);
        }, true);

    };

})();

