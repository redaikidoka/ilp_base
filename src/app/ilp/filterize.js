(function() {
    'use strict';

    angular
        .module('ilpBase')
        .filter('fromNow', function(moment) {
      		return function(date) {
      			return moment(date).fromNow();
      		};
      	});

})();
