"use strict";

angular.module("cloudapi").service("personService", personService);

function personService($http, $q, localStorageService) {
    var url = "https://eb-cloud-api.herokuapp.com/person";
    url = "http://localhost:3000/person";

    function insertUpdate(person) {
        var deferred = $q.defer();
        var token = localStorageService.get("token");
        
        var headers = {};
        if (person.id) {
            headers.Authorization = token;
        }

        var req = {
            method: (!person.id ? "POST" : "PUT"),
            url: (!person.id ? "http://localhost:3000/person" : "http://localhost:3000/person/" + person.id),
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