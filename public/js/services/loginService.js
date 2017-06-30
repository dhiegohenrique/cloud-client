"use strict";

angular.module("cloudapi").service("loginService", loginService);

function loginService($http, $q, EnvironmentConfig, loadingService) {
    function validate(login) {
        var deferred = $q.defer();

        var url = EnvironmentConfig.urlLogin;

        var req = {
            method: "POST",
            "url": url,
            data: login
        };

        loadingService.openModal();
        $http(req)
            .then(function(response) {
                var token = String(response.headers()["authorization"]);
                token = token.replace("Bearer", "").trim();

                var result = {
                    "token" : token,
                    "id" : response.data
                };

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
        "validate" : validate
    }
}