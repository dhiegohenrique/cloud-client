"use strict";

angular.module("cloudapi").factory("errorInterceptor", ["$q", "$location", "$rootScope", errorInterceptor]);

function errorInterceptor($q, $location, $rootScope) {
    return {
        responseError: function(rejection) {
            if (rejection.status < 0) {
                return;
            }

            if (rejection.config.url.indexOf("login") > -1 || rejection.config.url.indexOf("person") > -1) {
                return $q.reject(rejection);
            }

            $rootScope.statusCode = rejection.status;
            $location.path("/error");
            return $q.reject(rejection);
        }
    };
}