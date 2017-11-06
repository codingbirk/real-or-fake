angular.module('ngQuiz', ['ngSanitize'])

.controller('ngQuizController', function($scope, $timeout, quizProgress, scoreKeeper) {
  $scope.quizProgress = quizProgress;

  $scope.quizData = {
    "quizMetadata": {
      "title": "Real or Fake? 90s Edition",
      "intro": "How well do you know the 90s? Are you an idiot? let's find out! -->",
          },
    "quizQuestions": [{
      "question": "Watermelon Oreos",
      "questionImg": "https://cbi-blog.s3.amazonaws.com/blog/wp-content/uploads/2016/07/Watermelon-oreos.jpg",
      "feedback": "Flavored Oreos can be great (golden, birthday cake, reverse, etc.) but these just went too far. This weird flavor combination failed to find a following with consumers. It was only available for a limited time anyway, which is just as well.",
      "options": [{
        "name": "Real",
        "correct": true
      }, {
        "name": "Fake",
        "correct": false
      },
      ]
    }, {
      "question": "Apple 90s Ipad",
      "questionImg": "http://oldcomputers.net/pics/newton-pen.jpg",
      "feedback": " Pretty much everything apple made before the 2000s was absolute shit ",
      "options": [{
        "name": "Real",
        "correct": true
      }, {
        "name": "Fake",
        "correct": false
      }]
    }, {
      "question": "Eyetop Wearable DVD Player",
      "questionImg": "http://www.usability.wiki/images/c/c3/Eyetop_wearable_DVD_Player.jpg",
      "feedback": "This thing was ahead of its time, road trips with the family were revolutionized by these!",

      "options": [{
        "name": "Real",
        "correct": true
      }, {
        "name": "Fake",
        "correct": false
      }]
    }, {
      "question": "Glass bottom airplane",
      "questionImg": "http://i.huffpost.com/gen/1064984/thumbs/o-GLASS-BOTTOM-PLANE-570.jpg?6",
      "feedback": "I am glad this isnt real, I get vertigo going up a stairs ",
      "options": [{
        "name": "Real",
        "correct": false
      }, {
        "name": "Fake",
        "correct": true
      }]
    }, {
      "question": "Cheetos lip Balm",
      "questionImg": "https://cbi-blog.s3.amazonaws.com/blog/wp-content/uploads/2016/07/Cheetos-lip-balm.jpg",
      "feedback": "Getting Cheeto dust all over your lips, fingers, keyboard, and literally everything else is easily the worst part of eating Cheetos, so the idea of purposefully smearing your lips with something Cheeto-scented/flavored clearly didn’t appeal to many.",
      "options": [{
        "name": "Real",
        "correct": true
      }, {
        "name": "Fake",
        "correct": false
      }]
    }, {
      "question": "Motorized Ice Cream Cone Holder",
      "questionImg": "http://cdn.lifebuzz.com/images/79799/lifebuzz-a09e57c19eb2ac16b74da32bdd685664-limit_2000.jpg",
      "feedback": " I wish, this thing would have changed the Ice Cream Game",
      "options": [{
        "name": "Real",
        "correct": false
      }, {
        "name": "Fake",
        "correct": true
      }]
    }, {
      "question": "Tic Tac Pizza",
      "questionImg": "https://pbs.twimg.com/media/BGxKogcCIAAhVDt.jpg",
      "feedback": "Yuck, just yuck - there's a reason these dont exist ",
      "options": [{
        "name": "Real",
        "correct": false
      }, {
        "name": "Fake",
        "correct": true
      }]
    }, {
      "question": "Sandwich in a can: Candwich",
      "questionImg": "http://cdn.lifebuzz.com/images/79826/lifebuzz-be615c56d4f4b061d362834fb5085f05-limit_2000.jpg",
      "feedback": "Yes it is true, the Candwich comes in three flavors: peanut butter and strawberry jam, peanut butter and grape jam, and, the most terrifying of all, BBQ Chicken.",
      "options": [{
        "name": "Real",
        "correct": true
      }, {
        "name": "Fake",
        "correct": false
      }]
    }, {
      "question": "Nintendo Virtual Boy",
      "questionImg": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Virtual-Boy-Set.jpg/1200px-Virtual-Boy-Set.jpg",
      "feedback": " Nintendo started playing with VR before Zuckerberg thought it was cool, classic Mark rippin off others peoples ideas. Poor Winklevoss twins",
      "options": [{
        "name": "Real",
        "correct": true
      }, {
        "name": "Fake",
        "correct": false
      }]
    }, {
      "question": "IKEA Flatpack Lawnmower",
      "questionImg": "https://i.pinimg.com/originals/ec/eb/9a/eceb9a7911af6bba3a6350a05da97a46.jpg",
      "feedback": "This is lowkey the most realistic thing on here - IKEA needs to get in the home maintenance game already",
      "options": [{
        "name": "Real",
        "correct": false
      }, {
        "name": "Fake",
        "correct": true
      }]
    }]
  };

  $scope.quizQuestions = $scope.quizData.quizQuestions;
  $scope.quizMetadata = $scope.quizData.quizMetadata;
  quizProgress.lastQuestion = $scope.quizQuestions.length;
  quizProgress.loading = false;

  $scope.startQuiz = function() {
    quizProgress.inProgress = true;
    quizProgress.currentQuestion = 0;
    quizProgress.imageToPreload = 1;
  };

  $scope.nextQuestion = function() {
    if (quizProgress.currentQuestion < quizProgress.lastQuestion) {
      quizProgress.currentQuestion = quizProgress.currentQuestion + 1;
      quizProgress.currentQuestionFriendly = quizProgress.currentQuestionFriendly + 1;
      quizProgress.imageToPreload = quizProgress.imageToPreload + 1;
    }
  };

  $scope.answerQuestion = function(data) {
    $scope.quizQuestions[quizProgress.currentQuestion].answered = true;
    angular.forEach($scope.quizQuestions[quizProgress.currentQuestion].options, function(obj) {
      if (obj.name === data.selected) {
        obj.selected = true;
      } else {
        obj.selected = false;
      }
    });
  };

  $scope.checkAnswer = function() {
    $scope.quizQuestions[quizProgress.currentQuestion].answerChecked = true;

    angular.forEach($scope.quizQuestions[quizProgress.currentQuestion].options, function(obj) {
      if (obj.selected) {
        if (obj.correct) {
          $scope.quizQuestions[quizProgress.currentQuestion].answerWasRight = true;
        } else {
          $scope.quizQuestions[quizProgress.currentQuestion].answerWasRight = false;
        }
      }
    });
  };

  $scope.getScore = function() {
    quizProgress.inProgress = false;
    quizProgress.finished = true;
    quizProgress.calculatingScore = true;
    $scope.score = scoreKeeper.calculateScore($scope.quizQuestions);

    $timeout(function() {
      quizProgress.calculatingScore = false;
    }, 1500);
  };

  $scope.startOver = function() {
    angular.forEach($scope.quizQuestions, function(obj) {
      obj.answered = false;
      obj.answerWasRight = false;
      obj.answerChecked = false;

      angular.forEach(obj.options, function(option) {
        option.selected = false;
      });
    });

    quizProgress.inProgress = true;
    quizProgress.finished = false;
    quizProgress.currentQuestion = 0;
    quizProgress.currentQuestionFriendly = 1;
  };
})

.factory('quizProgress', function() {
  return {
    currentQuestion: 0,
    imageToPreload: 0,
    currentQuestionFriendly: 1,
    lastQuestion: 0,
    loading: true,
    inProgress: false,
    finished: false,
    calculatingScore: false
  };
})

.service('scoreKeeper', function() {
  this.calculateScore = function(quizQuestions) {
    var rightAnswers = 0;
    angular.forEach(quizQuestions, function(obj) {
      if (obj.answerWasRight) {
        rightAnswers += 1;
      }
    });

    return ((rightAnswers / quizQuestions.length) * 100).toFixed() + '%';
  };
})

.directive('progressBar', function(quizProgress) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      scope.$watch('quizProgress', function(newVal, oldVal) {
        if (newVal) {
          element.css('width', ((quizProgress.currentQuestionFriendly / quizProgress.lastQuestion) * 100 + '%'));
        }
      }, true);
    }
  };
})

.directive('imagePreload', function(quizProgress) {
  return {
    restrict: 'EA',
    template: "<img style='display:none;' ng-src='{{quizQuestions[quizProgress.imageToPreload].questionImg}}'/>"
  };
})

.directive('animateProgression', function(quizProgress, $timeout) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      scope.$watch('quizProgress.currentQuestion', function(newVal, oldVal) {
        if (newVal) {
          element.addClass('question-animate');
          $timeout(function() {
            element.removeClass('question-animate');
          }, 1500);
        }
      });
    }
  };
});