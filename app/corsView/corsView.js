'use strict';

angular.module('tutorialConnectApp.corsView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/corsView', {
    templateUrl: 'corsView/corsView.html',
    controller: 'corsViewCtrl as cvCtrl'
  });
}])

.controller('corsViewCtrl', ['$scope', '$http', 
  function( $scope, $http ) {
    var cvCtrl = this;
    
    loadTopics();

    function loadTopics() { 
      cvCtrl.showError = false;

      // JSONP request. Remember to include '?callback=JSON_CALLBACK'
      $http.jsonp('http://localhost:3000/api/topics/?callback=JSON_CALLBACK')
        .success(function(data) {
          cvCtrl.topics = data;
        })
        .error(function() {
          showError('CORS ', 'some error occured with the JSONP');
        });
    };

    cvCtrl.loadJSONP = function() {
      loadTopics();
    };

    cvCtrl.corsError = function(origin) {
      showError(' does not work, the backend needs to accept parameters.', origin );
    }



    function showError(data, status) {
      cvCtrl.errorStatusText = status;
      cvCtrl.errorText = ' - ' + data;
      cvCtrl.showError = true;
    }

  }
]);