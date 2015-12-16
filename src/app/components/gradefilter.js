(function() {
    'use strict';

    angular
        .module('ilpBase')
        .filter('showgrade', function() {
            return function(grade) {
            	if (parseInt(grade) === 0)
            		{return 'K';}
            	else {return grade;}
            };
        });

})();
