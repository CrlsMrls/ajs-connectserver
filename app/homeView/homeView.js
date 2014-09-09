'use strict';

angular.module('tutorialConnectApp.homeView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/homeView', {
    templateUrl: 'homeView/homeView.html'
  });
}]);