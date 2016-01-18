/* global moment:false */
(function() {
  'use strict';

  angular
    .module('ilpBase')
    .constant('moment', moment)
    .constant('imgPath', "/assets/images")
    .constant('appSettings', {
    	appName: 'ILP',
    	appTesting: false,
      restURL: 'http://192.241.235.93:3000/api'
     //    ,
    	// restURL: 'http://localhost:3000/api'
    });

})();
