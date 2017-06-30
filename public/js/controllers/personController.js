"use strict";

angular.module("cloudapi").controller("personController", ["$scope", "loadingService", "modalService", "$window", "personService", "person", personController]);

function personController($scope, loadingService, modalService, $window, personService, person) {
    $scope.person = {};
    $scope.hasPerson = false;
    if (person) {
        $scope.person = person;
        $scope.hasPerson = true;
        // $state.go("cloud");
    }

    var personMaster = angular.copy($scope.person);
    $scope.submitted = false;
    $scope.message = undefined;
    
    $scope.newPerson = function(isValid) {
        $scope.submitted = true;
        if (!isValid) {
            return;
        }

        $scope.message = undefined;
        loadingService.openModal();
        personService.insertUpdate($scope.person)
            .then(function(response) {
                if (!$scope.person.id) {
                    $window.location = "/";
                } else {
                    $scope.message = "As informações foram salvas.";
                    $scope.classMessage = "alert-success";
                }
            })
            .catch(function(error) {
                $scope.message = error.data[0];
                $scope.classMessage = "alert-danger";
            })
            .finally(function() {
                loadingService.closeModal();
            });
    };

    $scope.showConfirmCancel = function() {
        if (angular.equals(personMaster, $scope.person)) {
            cancel();
            return;
        }

        showModal("O formulário foi editado. Todas as informações não salvas serão perdidas. Deseja prosseguir?");
    };

    $scope.showConfirmLogoff = function() {
        showModal("Deseja deslogar?");
    };

    function showModal(content) {
        var options = {
            "title" : "Confirmação",
            "content" : content
        };

        function callBackYes() {
            cancel();
        };

        modalService.openConfirmModal(options, callBackYes);
    };

    function cancel() {
        $window.location = "/";
    };
};