(function() {
  'use strict';

  angular
    .module('ilpBase')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $rootScope, $state, AuthService, ConfigService) {
    $rootScope.configs = {};

    // load the config
    ConfigService.getCurrentYearId();

  	$rootScope.$on("$stateChangeStart", function(event, toState /*, toParams, fromState, fromParams */){

  		if (toState.authenticate && !AuthService.isAuthenticated()) {
  			//user needs authentication
  			$state.transitionTo("login");
  			event.preventDefault();
        // console.log("prevented routing. Heading for login");
  		}
  	});
    $log.debug('runBlock end');
  }

})();
