(function() {
    'use strict';

    angular
        .module('ilpBase')
        .service('ConfigService', ConfigService);

    /** @ngInject */
    function ConfigService($rootScope, $log, $filter, appSettings, IlsApp) {
        var console = $log;
        var localAppSettings;
        var currentYearId = null;
        var currentYear = '';
        loadConfig();

        this.getCurrentYearId = getCurrentYearId;
        this.getCurrentYear = getCurrentYear;
        this.loadConfig = loadConfig;

        // gets the current teacher id
        function getCurrentYearId() {

            return currentYearId;
        }

        function getCurrentYear() {
        	return currentYear;
        }

        function loadConfig() {
        	// ilp[ils_App]
            IlsApp.find().$promise
                .then(function(result) {
                    // console.log("ConfigService: got the config", result);
                    $rootScope.appConfig = result;
                    localAppSettings = result;

                    // current year settings.
                    currentYearId = getAppSettingInt('currentSchoolYear');
                    currentYear = getAppSetting('currentSchoolYear');
                    // console.log("currentYearId", currentYearId);

                }, function(err) {
                    console.log("ConfigService: No app config. :(", err);
           
                });
        }

        function getAppSetting(keyValue) {
        	var theSetting = findSetting(keyValue) ;
        	if( theSetting ) {
        		return theSetting.textValue;
        	}
        	else {return '';}
        }


        function getAppSettingInt(keyValue) {
         	var theSetting = findSetting(keyValue) ;
        	if( theSetting ) {
       		// console.log("found:", theRecord);
        		return theSetting.intValue;}
        	else {
        		// console.log("couldn't find keyValue", keyValue, " in ", localAppSettings);
        		return 0;
        	}
        }

        function findSetting(keyValue) {
        	var theRecord = $filter('filter')(localAppSettings, 
                    {key: keyValue}, 
                    true);
			
			if (theRecord) { return theRecord[0];}
			else { 
				console.log("couldn't find keyValue", keyValue, " in ", localAppSettings);
				return null;
			}        	
        }

    }


})();
