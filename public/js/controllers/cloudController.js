"use strict";

angular.module("cloudapi").controller("cloudController", ["$scope", "$state", "$rootScope", "$stateParams", "cloudService", "$q", "loadingService", "cloud", "modalService", cloudController]);

function cloudController($scope, $state, $rootScope, $stateParams, cloudService, $q, loadingService, cloud, modalService) {
    $scope.cloud = cloud;
    var cloudMaster = angular.copy($scope.cloud);
    $scope.title = "Nova instância";
    if ($scope.cloud.id) {
        $scope.title = "Editar instância";
    }

    $scope.save = function(isValid) {
        $scope.submitted = true;
        if (!isValid) {
            return;
        }

        console.log("salvando: " + JSON.stringify());

        loadingService.openModal();
        cloudService.insertUpdate($scope.cloud)
            .then(function(response) {
                $rootScope.isCarEdit = false;
                if (!$scope.cloud.id) {
                    $scope.cloud.id = response.id;
                }

                $state.go("cloudlist", {"cloud" : $scope.cloud});
            })
            .finally(function() {
                loadingService.closeModal();
            });
    };

    $scope.onBlur = function() {
        $rootScope.isCarEdit = !angular.equals(cloudMaster, $scope.cloud);
    };

    $scope.cancel = function() {
        if ($rootScope.isCarEdit) {
            showConfirmCancelEdit();
            return;
        }

        $state.go("cloudlist");
    }

    function showConfirmCancelEdit() {
        var options = {
            title : "Confirmação",
            content : "O formulário foi editado. Todas as informações não salvas serão perdidas. Deseja prosseguir?"
        };

        function callBackYes() {
            $rootScope.isCarEdit = false;
            $state.go("cloudlist");
        };

        modalService.openConfirmModal(options, callBackYes);
    };
};