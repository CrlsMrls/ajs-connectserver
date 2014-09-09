'use strict';

// Declare app level module which depends on views, and components
angular.module('tutorialConnectApp', [
  'ngRoute',
  'ngResource',
  'tutorialConnectApp.homeView',
  'tutorialConnectApp.httpView',
  'tutorialConnectApp.corsView',
  'tutorialConnectApp.resourceView'
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/homeView'});
}])
.factory('Topics', ['$resource', function($resource) {
  return $resource('http://localhost\\:3000/api/topics/:topicid', null,
     {
        'update': { method:'PUT', params: {topicid: '@_id'} },
        'remove': { method:'DELETE', params: {topicid: '@_id'}}
     });
  }]);
