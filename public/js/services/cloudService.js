"use strict";

angular.module("cloudapi").service("cloudService", cloudService);

function cloudService($http, $q, localStorageService, EnvironmentConfig, loadingService) {
    var url = EnvironmentConfig.urlCloud;

    function getClouds() {
        var token = localStorageService.get("token");
        var deferred = $q.defer();

        var config = {
            headers: {
                "Authorization": token
            }
        };

        loadingService.openModal();
        $http.get(url, config)
            .then(function(response) {
                deferred.resolve(response.data);
            }, function(error) {
                deferred.reject(error);
            })
            .finally(function() {
                loadingService.closeModal();
            });

        return deferred.promise;
    };

    function getCloudById(id) {
        var token = localStorageService.get("token");
        var deferred = $q.defer();

        var config = {
            headers: {
                "Authorization": token
            }
        };

        loadingService.openModal();
        $http.get(url + "/" + id, config)
            .then(function(response) {
                deferred.resolve(response.data);
            }, function(error) {
                deferred.reject(error);
            })
            .finally(function() {
                loadingService.closeModal();
            });

        return deferred.promise;
    };

    function deleteInstance(id) {
        var token = localStorageService.get("token");
        var deferred = $q.defer();

        var config = {
            headers: {
                "Authorization": token
            }
        };

        loadingService.openModal();
        $http.delete(url + "/" + id, config)
            .then(function(response) {
                deferred.resolve(response.data);
            }, function(error) {
                deferred.reject(error);
            })
            .finally(function() {
                loadingService.closeModal();
            });

        return deferred.promise;
    };

    function insertUpdate(cloud) {
        var token = localStorageService.get("token");
        var deferred = $q.defer();

        var req = {
            method: (!cloud.id ? "POST" : "PUT"),
            url: (!cloud.id ? url : (url + "/" + cloud.id)),
            headers: {
                "Authorization": token
            },
            data: cloud
        };

        loadingService.openModal();
        $http(req)
            .then(function(response) {
                var location = String(response.headers()["location"]);
                var result = {};
                if (location) {
                    var index = location.lastIndexOf('/');
                    result.id = location.substring(index  + 1);
                }
                deferred.resolve(result);
            }, function(error) {
                deferred.reject(error);
            })
            .finally(function() {
                loadingService.closeModal();
            });

        return deferred.promise;
    };

    return {
        "getClouds" : getClouds,
        "getCloudById" : getCloudById,
        "deleteInstance" : deleteInstance,
        "insertUpdate" : insertUpdate
    }
}