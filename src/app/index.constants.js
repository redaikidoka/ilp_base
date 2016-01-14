/* global moment:false */
(function() {
  'use strict';

  angular
    .module('ilpBase')
    .constant('moment', moment)
    .constant('imgPath', "/assets/images")
    .constant('appSettings', {
    	appName: 'ILP',
    	appTesting: false
     //    ,
    	// restURL: 'http://localhost:3000/api'
    });

})();
