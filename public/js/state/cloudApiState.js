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
    });
}