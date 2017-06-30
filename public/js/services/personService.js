"use strict";

angular.module("cloudapi").service("personService", personService);

function personService($http, $q, localStorageService, EnvironmentConfig) {
    var url = EnvironmentConfig.urlPerson;

    function insertUpdate(person) {
        var deferred = $q.defer();
        var token = localStorageService.get("token");
        
        var headers = {};
        if (person.id) {
            headers.Authorization = token;
        }

        var req = {
            method: (!person.id ? "POST" : "PUT"),
            "url": (!person.id ? url : (url + "/" + person.id)),
            "headers": headers,
            data: person
        };

        $http(req)
            .then(function(response) {
                deferred.resolve(response.data);
            }, function(error) {
                deferred.reject(error);
            });

        return deferred.promise;
    };

    function getPersonById(id) {
        var token = localStorageService.get("token");
        var deferred = $q.defer();

        var config = {
            headers: {
                "Authorization": token
            }
        };

        $http.get(url + "/" + id, config)
            .then(function(response) {
                deferred.resolve(response.data);
            }, function(error) {
                deferred.reject(error);
            });

        return deferred.promise;
    };

    return {
        "insertUpdate" : insertUpdate,
        "getPersonById" : getPersonById
    }
}