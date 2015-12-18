(function() {
  'use strict';

  angular
      .module('ilpBase')
      .service('AuthService', AuthService);

  /** @ngInject */
  function AuthService($rootScope, $log, appSettings) {
    var console = $log;

    this.login = login;
    this.isAuthenticated = isAuthenticated;
    this.logout = logout;
    this.getUserId = getUserId;
    this.getDefaultUser = getDefaultUser;

    // gets the current teacher id
    function getUserId() {
      if (!isAuthenticated())
        { 
          return null;
        }

      return $rootScope.user.idTeacher;
    }

    function login(uname, upass) {
      if (appSettings.appTesting)
      {
        $rootScope.user = getTestUser();
        if( $rootScope.user.username !== uname.name )
          {console.log("diff username on test login", uname, $rootScope.user.username, upass);}
        return true;
      }

      //TODO: verify user login
      return false;
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
        console.log("getting default user");
        $rootScope.user = getDefaultUser();

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
