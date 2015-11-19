/* global moment:false */
(function() {
  'use strict';

  angular
    .module('ilpBase')
    .constant('moment', moment)
    .constant('appSettings', {
    	appName: 'ILP',
    	appMode: 'test',
    	appTesting: true
    });

})();
