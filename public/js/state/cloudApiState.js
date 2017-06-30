"use strict";

angular.module("cloudapi").config(["$stateProvider", "$urlRouterProvider", cloudApiState]);

function cloudApiState($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider
    .state("error", {
        url: "/error",
        templateUrl: "./../partials/errorMessage.html",
        controller: "errorMessageController"
    })
    .state("person", {
        url: "/person",
        templateUrl: "./../partials/personForm.html",
        controller: "personController",
        params: {"id": null},
        resolve : {
            person : ["personService", "$stateParams", function(personService, $stateParams) {
                if (!$stateParams.id) {
                    return;
                }
                
                return personService.getPersonById($stateParams.id)
                    .then(function(result) {
                        return result;
                    });
            }]
        }
    })
    .state("cloudlist", {
        url: "/cloudlist",
        parent: "person",
        templateUrl: "./../partials/cloudList.html",
        controller: "cloudListController",
        params: {"cloud" : null},
        resolve : {
            clouds : ["cloudService", function(cloudService) {
                return cloudService.getClouds()
                    .then(function(result) {
                        return result;
                    });
            }]
        }
    })
    .state("cloud", {
        url: "/cloud",
        parent: "cloudlist",
        templateUrl: "./../partials/cloudForm.html",
        controller: "cloudController",
        params: {"cloudId" : null},
        resolve : {
            cloud : ["cloudService", "$stateParams", function(cloudService, $stateParams) {
                if (!$stateParams.cloudId) {
                    return {"active" : true};
                }

                return cloudService.getCloudById($stateParams.cloudId)
                    .then(function(result) {
                        return result;
                    });
            }]
        }
    });
}