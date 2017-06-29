"use strict";

angular.module("cloudapi").config(["$httpProvider", interceptorsConfig]);

function interceptorsConfig($httpProvider) {
    $httpProvider.interceptors.push("errorInterceptor");
};