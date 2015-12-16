(function() {
  'use strict';

  angular
    .module('ilpBase')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $rootScope, $state, AuthService) {
  	$rootScope.$on("$stateChangeStart", function(event, toState /*, toParams, fromState, fromParams */){
  		// console.log("$stateChangeStart.$on");
  		if (toState.authenticate && !AuthService.isAuthenticated()) {
  			//user needs authentication
  			// console.log("oh, hell nah.");
  			$state.transitionTo("login");
  			event.preventDefault();
  		}
  	});
    $log.debug('runBlock end');
  }

})();
