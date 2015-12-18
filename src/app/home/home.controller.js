(function() {
  'use strict';

  angular
    .module('ilpBase')
    .controller('HomeController', HomeController);

  /** @ngInject */
  function HomeController($scope, $log, $state, $rootScope, AuthService) {
    // var vm = this;
    var console = $log;
    // var localUser = {};
    $scope.user = {};
    $scope.loginproblem = false;
    $scope.loginmessage = '';
    $scope.customBodyClass = 'home';

    console.log($rootScope.bodyClass); 
    $scope.login = function(user, pw) {

      // hand things off to the AuthService
      if (AuthService.login(user, pw))
      {
        $state.go('myclasses');
      }
      else {
        console.log("didn't login. :(");
        $scope.loginproblem = true;
        $scope.loginmessage="I'm sorry, I couldn't log you in. :(";
      }

    };

    $scope.getBodyClass = function() {
      return 'home';
    };

    $scope.hasProblem = function() {
      if ($scope.loginproblem === true)
        { return true;}

      return false;
    };

  }
})();
