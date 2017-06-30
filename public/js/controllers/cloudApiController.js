"use strict";

angular.module("cloudapi").controller("cloudApiController", ["$scope", "$state", "loadingService", "loginService", "localStorageService", cloudApiController]);

function cloudApiController($scope, $state, loadingService, loginService, localStorageService) {
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
        loadingService.openModal();
        loginService.validate($scope.login)
            .then(function(response) {
                $scope.isTokenValid = true;
                localStorageService.set("token", response.token);
                $state.go("cloudlist", {"id" : response.id});
            })
            .catch(function(error) {
                localStorageService.remove("token");
                $scope.errorMessage = error.data.message;
            })
            .finally(function() {
                loadingService.closeModal();
            });
    };

    $scope.newPerson = function() {
        $state.go("person");
    }

    init();
};