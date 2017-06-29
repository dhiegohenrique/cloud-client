"use strict";

angular.module("cloudapi").service("loadingService", ["$uibModal", "$templateCache", loadingService]);

function loadingService($uibModal, $templateCache) {
    var service = {};
    var instance;
    var isOpen = false;

    service.openModal = function openModal() {
        if (isOpen) {
            return;
        }

        instance = $uibModal.open({
            template: $templateCache.get("public/js/directives/loadingModal.html"),
            size : "sm",
            backdrop : "static"
        });

        isOpen = true;
        instance.result.finally(function () {
            isOpen = false;
        });
    };

    service.closeModal = function closeModal() {
        if (isOpen) {
            instance.close();
        }
    }

    return service;
};