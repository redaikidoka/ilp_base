(function() {
  'use strict';

  angular
      .module('ilpBase')
      .service('AuthService', AuthService);

  /** @ngInject */
  function AuthService($rootScope, appSettings) {
   

    this.isAuthenticated = isAuthenticated;
    this.logout = logout;

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
        $rootScope.user = {
                    "name" : "Severus Snape",
                    "username" : "snape",
                    "password" : "debug",
                    "thumbnail" : "assets/images/snape.jpg",
                    "validated" : false,
                    "loggedin" : true
        };

        return true;

      }

      //nope
      return false;
    }

    function logout() {
      // TODO: invalidate token

      // 
      $rootScope.user = null;
    }
  }

})();
