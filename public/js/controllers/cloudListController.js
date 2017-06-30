"use strict";

angular.module("cloudapi").controller("cloudListController", ["$scope", "$state", "$stateParams", "$rootScope", "modalService", "clouds", "cloudService", cloudListController]);

function cloudListController($scope, $state, $stateParams, $rootScope, modalService, clouds, cloudService) {
    $scope.clouds = clouds;
    var cloud = $stateParams.cloud;
    if (cloud) {
        var index = getCloudIndex(cloud.id);
        if (index < 0) {
            $scope.clouds.push(cloud);
        } else {
            $scope.clouds.splice(index, 1, cloud);
        }
    }

    $scope.showInstance = function(id) {
        if ($rootScope.isCloudEdit) {
            showConfirmCancelEdit(id);
            return;
        }

        $state.go("cloud", {"cloudId" : id});
    };

    $scope.clickDelete = function(id, $event) {
        if ($rootScope.isCloudEdit) {
            showConfirmCancelEdit(id, true);
        } else {
            showConfirmDeleteCloud(id);
        }
        
        $event.preventDefault();
        $event.stopPropagation();
    }

    function showConfirmCancelEdit(id, isDeleting) {
        var options = {
            title : "Confirmação",
            content : "O formulário foi editado. Todas as informações não salvas serão perdidas. Deseja prosseguir?"
        };

        function callBackYes() {
            $rootScope.isCloudEdit = false;
            if (isDeleting) {
                showConfirmDeleteCloud(id);
                return;
            }

            $state.go("cloud", {"cloudId" : id});
        };

        modalService.openConfirmModal(options, callBackYes);
    };

    function showConfirmDeleteCloud(id) {
        var options = {
            title : "Confirmar exclusão",
            content: "Deseja excluir a instância selecionada?"
        };

        function callBackYes() {
            deleteCloud(id);
        };

        modalService.openConfirmModal(options, callBackYes);
    };

    function deleteCloud(id) {
        cloudService.deleteInstance(id)
            .then(function(response) {
                $rootScope.isCloudEdit = false;
                var index = getCloudIndex(id);
                $scope.clouds.splice(index, 1);
                $state.go("cloudlist");
            });
    };

    function getCloudIndex(id) {
        for (var index = 0; index < $scope.clouds.length; index++) {
            if (id == $scope.clouds[index].id) {
                return index;
            }
        }

        return -1;
    };
};