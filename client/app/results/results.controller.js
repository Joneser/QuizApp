'use strict';

angular.module('quizAppApp')
  .controller('ResultsCtrl', function ($scope, $http, $timeout, Auth) {
    
    $scope.currentUser = Auth.getCurrentUser();

    $http.get('/api/quiz/?email=' + $scope.currentUser.email).then(function(res) {
      $scope.results = res.data;
      $scope.calcCorrect();
    });
    
    
    /**
     * This function calculates the percentge of correct answers for this quiz
     */
    $scope.calcCorrect = function() {
      
      var total = $scope.results.answers.length;
      var correct = 0;
      
      for(var i = 0; i < total; i++) {
        if($scope.results.answers[i].userAnswer === $scope.results.answers[i].correctAnswer) {
          correct++;
        }
        
        $scope.percentCorrect = parseInt((100 / total) * correct);
        
      }
      
    };

  });
