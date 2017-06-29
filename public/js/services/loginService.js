"use strict";

angular.module("cloudapi").service("loginService", loginService);

function loginService($http, $q) {
    function validate(login) {
        var deferred = $q.defer();

        var url = "https://eb-cloud-api.herokuapp.com/login";
        var _url = "http://localhost:3000/login";

        var req = {
            method: "POST",
            url: _url,
            data: login
        };

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
            });

        return deferred.promise;
    };

    return {
        "validate" : validate
    }
}