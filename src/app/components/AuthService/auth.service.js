(function() {
  'use strict';

  angular
      .module('ilpBase')
      .service('AuthService', AuthService);

  /** @ngInject */
  function AuthService($rootScope, appSettings) {
   
    this.login = login;
    this.isAuthenticated = isAuthenticated;
    this.logout = logout;
    this.getUserId = getUserId;


    function getUserId() {
      if (!$rootScope.user || !$rootScope.user.loggedin)
        { return null;}

      return $rootScope.user.idTeacher;
    }
    
    function login(uname, upass) {
      if (appSettings.appTesting)
      {
        $rootScope.user = getTestUser();
        return true;
      }
    }


    function isAuthenticated() {

      // console.log("Authenticating: ", $rootScope.user);

      // check user 
      if ($rootScope.user) {
        if ($rootScope.user.loggedin)
          {
            // TODO: check token

            // Yay
            return true;
          }
      }
      else if (appSettings.appTesting) {
        $rootScope.user = getTestUser();

        return true;

      }

      //nope
      return false;
    }

    function logout() {
      // TODO: invalidate token

      // 
      $rootScope.user = null;

      return true;
    }

    function getDefaultUser() {
      var defaultUser = {
          "idTeacher": 29,
          "name": "Severus Snape",
          "nameFirst": "Severus ",
          "nameLast": "Snape",
          "teacherId": "90983664",
          "cohort": "Slytherin",
          "username" : "snape",
          "password" : "debug",
          "thumbnail" : "assets/images/snape.jpg",
          "validated" : false,
          "loggedin" : true       
        };

        return defaultUser;
    }

    function getTestUser() {
      var testUser =  {
          "idTeacher": 13,
          "name": "Filius Flitwick",
          "nameFirst": "Filius ",
          "nameLast": "Flitwick",
          "teacherId": "145860408",
          "cohort": "",
          "username" : "filius",
          "password" : "password",
          "thumbnail" : "assets/images/flitwick.jpeg",
          "validated" : true,
          "loggedin": true
        };

        return testUser;

      }
    }


})();
