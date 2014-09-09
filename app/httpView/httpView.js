'use strict';

angular.module('tutorialConnectApp.httpView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/httpView', {
    templateUrl: 'httpView/httpView.html',
    controller: 'httpViewCtrl as hvCtrl'
  });
}])

.controller('httpViewCtrl', ['$scope', '$http', 
  function( $scope, $http ) {
    var hvCtrl = this;
    
    loadTopics();

    function loadTopics() { 
      hvCtrl.showError = false;

      ///// HTTP GET ///// 
      $http.get('http://localhost:3000/api/topics/', {cache: false})
        .success(function(data) {
          hvCtrl.topics = data;
        })
        .error(function(data,status){
          showError(data, status);
        });
    };

    
    hvCtrl.addTopic = function() {
      
      if(hvCtrl.newTopicTitle) {
        var newTopic = { title: hvCtrl.newTopicTitle, votes: 0};

        ///// HTTP POST ///// 
        $http.post('http://localhost:3000/api/topics/', newTopic)
          .success(function(data) {
            loadTopics();
            hvCtrl.newTopicTitle = '';
          })
          .error(function(data,status){
            showError(data, status);
          });
      }
    }

    
    hvCtrl.deleteTopic = function(topicId) {
      ///// HTTP DELETE ///// 
      $http.delete('http://localhost:3000/api/topics/' + topicId)
          .success(function(data) {
            loadTopics();
          })
          .error(function(data,status){
            showError(data, status);
          });
    }

    
    hvCtrl.sumVote = function(topic) {
      topic.votes += 1;

      ///// HTTP PUT ///// 
      $http.put('http://localhost:3000/api/topics/'+topic._id, topic)
        .success(function(data) {
          loadTopics();
        })
        .error(function(data,status){
          showError(data, status);
        });
    }


    function showError(data, status) {
      hvCtrl.errorStatusText = status;
      hvCtrl.errorText = ' - ' + data;
      hvCtrl.showError = true;
    }

  }
]);