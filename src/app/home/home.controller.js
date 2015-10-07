(function() {
  'use strict';

  angular
    .module('ilpBase')
    .controller('HomeController', HomeController);

  /** @ngInject */
  function HomeController($scope, $location, $rootScope) {
    var vm = this;
    var localUser = {};
    $scope.user = {};

    var testUserName = "Filius Flitwik";
    var testuserPic="assets/images/flitwick.jpeg";
    vm.userPic = "";
    // vm.userName="Filius Flitwik";
    // vm.userPic="assets/images/flitwick.jpeg";

    $scope.login = function(user) {
        console.log("Clicked login with:", user);
        if (user.name === 'filius')
        {
            localUser.name = testUserName;
            localUser.username = user.name;
            localUser.password = user.password;
            localUser.thumbnail = testuserPic;
            localUser.validated = true;
            localUser.loggedin = true;
            $rootScope.user = localUser;
            $location.path('/classes');
       }
    };

    // vm.awesomeThings = [];
    // vm.classAnimation = '';
    // vm.creationDate = 1440528250245;
    // vm.showToastr = showToastr;

    // activate();

    // function activate() {
    //   getWebDevTec();
    //   $timeout(function() {
    //     vm.classAnimation = 'rubberBand';
    //   }, 4000);
    // }

    // function showToastr() {
    //   toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
    //   vm.classAnimation = '';
    // }

    // function getWebDevTec() {
    //   vm.awesomeThings = webDevTec.getTec();

    //   angular.forEach(vm.awesomeThings, function(awesomeThing) {
    //     awesomeThing.rank = Math.random();
    //   });
    // }
  }
})();
