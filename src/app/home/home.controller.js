(function() {
  'use strict';

  angular
    .module('ilpBase')
    .controller('HomeController', HomeController);

  /** @ngInject */
  function HomeController($scope, $state, $rootScope) {
    var vm = this;
    var localUser = {};
    $scope.user = {};

    var testUserName = "Filius Flitwik";
    var testuserPic="assets/images/flitwick.jpeg";
    vm.userPic = "";


    $scope.login = function(user) {
        // console.log("Clicked login with:", user);
        if (user.name === 'filius')
        {
            localUser.name = testUserName;
            localUser.username = user.name;
            localUser.password = user.password;
            localUser.thumbnail = testuserPic;
            localUser.validated = true;
            localUser.loggedin = true;

            $rootScope.user = localUser;
            
            $state.go('myclasses');
       }
    };

  }
})();
