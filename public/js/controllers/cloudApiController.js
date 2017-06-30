"use strict";

angular.module("cloudapi").controller("cloudApiController", ["$scope", "$state", "loginService", "localStorageService", cloudApiController]);

function cloudApiController($scope, $state, loginService, localStorageService) {
    var init = function() {
        $scope.login = {};
        $scope.isTokenValid = false;
    };

    $scope.submit = function(isValid) {
        $scope.submitted = true;

        if (!isValid) {
            return;
        }

        $scope.errorMessage = undefined;
        loginService.validate($scope.login)
            .then(function(response) {
                $scope.isTokenValid = true;
                localStorageService.set("token", response.token);
                $state.go("cloudlist", {"id" : response.id});
            })
            .catch(function(error) {
                localStorageService.remove("token");
                $scope.errorMessage = error.data.message;
            });
    };

    $scope.newPerson = function() {
        $state.go("person");
    }

    init();
};