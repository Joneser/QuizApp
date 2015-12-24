'use strict';

angular.module('quizAppApp')
  .controller('MainCtrl', function ($scope, $http, $location, Auth) {
    
    $scope.selectedAnswer = {};
    $scope.selectedAnswer.value = '';
    $scope.answers = [];
    
    $scope.currentUser = Auth.getCurrentUser();
    
    $scope.buttonText = 'Continue';
    
    $scope.questions = [
        {question: 'Which is not an advantage of using a closure?', 
        correctAnswer: 'C. Private properties and methods',
        answers: ['A. Prevent pollution of global scope', 'B. Encapsulation', 'C. Private properties and methods', 'D. Allow conditional use of \'strict mode\' ']},
        {question: 'To create a columned list of two-­line email subjects and dates for a master­-detail view, which are the most semantically correct?', 
        correctAnswer: 'C. <ul>+<li>',
        answers: ['A. <div>+<span>', 'B. <tr>+<td>', 'C. <ul>+<li>', 'D. <p>+<br>', 'E. none of these', 'F. all of these']},
        {question: 'To pass an array of strings to a function, you should not use…', 
        correctAnswer: 'C. fn.bind(this, stringsArray)',
        answers: ['A. fn.apply(this, stringsArray)', 'B. fn.call(this, stringsArray)', 'C. fn.bind(this, stringsArray)']},
        {question: 'Given <div id=”outer”><div class=”inner”></div></div>, which of these two is the most performant way to select the inner div?', 
        correctAnswer: 'A. getElementById("outer").children[0]',
        answers: ['A. getElementById("outer").children[0]', 'B. getElementsByClassName("inner")[0]']},
        {question: 'Given this:\n' +
                  'angular.module(\'myModule\', [])\n' + 
                    '  .service(\'myService\', (function() {\n' +
                      '     var message = \'Message one!\';\n' +
                      '     var getMessage = function() {\n' +
                      '        return this.message;\n' +
                      '      };\n' + 
                      '\n' + 
                      '      this.message = \'Message two!\';\n' +
                      '      this.getMessage = function() {\n' +
                      '        return message;\n' +
                      '      };\n'+
                      '\n' + 
                      '     return {\n' +
                      '       getMessage: getMessage,\n' +
                      '       message: \'Message three!\';\n' +
                      '     };\n'+
                    '}) ());\n' +
                    'Which message will be returned by injecting this service and executing "myService.getMessage()"?',
        correctAnswer: '',
        answers: ['A. 1', 'B. 2', 'C. 3']}
      ];
      
      $scope.questionIndex = 0;
      
      $scope.currentQuestion = $scope.questions[$scope.questionIndex];
      
      $scope.nextQuestion = function() {
        
        $scope.answers.push({question: $scope.questions[$scope.questionIndex].question, userAnswer: $scope.selectedAnswer.value, correctAnswer: $scope.questions[$scope.questionIndex].correctAnswer || ''});
        $scope.selectedAnswer.value = '';
        
        if($scope.questionIndex !== $scope.questions.length - 1 ) {
            $scope.questionIndex++;
            
            if($scope.questionIndex === $scope.questions.length - 1) {
              $scope.buttonText = 'Finish';
            }
            
            $scope.currentQuestion = $scope.questions[$scope.questionIndex];
            return;
        }
        
        $scope.answers
        $scope.saveQuiz();
      };

    $scope.saveQuiz = function() {
      $http.post('/api/quiz', { user: $scope.currentUser.email, answers: $scope.answers });
      $location.path('/results');
    };

  });
