angular.module('cloudapi').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('public/js/directives/loadingModal.html',
    "<div class=\"modal-body\">\r" +
    "\n" +
    "    <div class=\"row\">\r" +
    "\n" +
    "        <div class=\"col-xs-12 col-sm-12 col-md-11 col-lg-12\">\r" +
    "\n" +
    "            <h4 class=\"text-center\">Carregando...</h4>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"row\">\r" +
    "\n" +
    "        <div class=\"col-xs-12 col-sm-12 col-md-11 col-lg-12 text-center\">\r" +
    "\n" +
    "            <i class=\"fa fa-spinner fa-pulse fa-3x\"></i>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );
}]);