'use strict';tmpTopics

angular.module('tutorialConnectApp.resourceView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/resourceView', {
    templateUrl: 'resourceView/resourceView.html',
    controller: 'resourceViewCtrl as rvCtrl'
  });
}])

.controller('resourceViewCtrl', ['$scope', '$http', 'Topics',
  function( $scope, $http, Topics ) {

    var rvCtrl = this;
    
    loadTopics();

    function loadTopics() { 
      rvCtrl.showError = false;

      // GET HTTP and returns an array
      rvCtrl.topics = Topics.query();;
      
    };

    
    rvCtrl.addTopic = function() {
      
      if(rvCtrl.newTopicTitle) {

        // create new $resource object
        var newTopic = new Topics({ 
          title: rvCtrl.newTopicTitle, votes: 0
        });

        // HTTP POST 
        newTopic.$save()
          .then( function() {
            rvCtrl.newTopicTitle = '';
            loadTopics();
          });
        
      } // endif
    }

    
    rvCtrl.deleteTopic = function(topic) {

      topic.$remove()
        .then( function() {
          loadTopics();
        });
    }

    
    rvCtrl.sumVote = function(topic) {

      topic.votes += 1;

      topic.$update()
        .then( function() {
          loadTopics();
        });
    }


    function showError(data, status) {
      rvCtrl.errorStatusText = status;
      rvCtrl.errorText = ' - ' + data;
      rvCtrl.showError = true;
    }

  } 
]);