(function() {
    'use strict';

    angular
        .module('ilpBase')
        .filter('fromNow', function(moment) {
      		return function(date) {
      			return moment(date).fromNow();
      		};
      	})
      	.filter('textToLines', function() {
      		return function(text) {
      			if (text) {
      				return text.split(/\r\n|\r|\n/g);
      			}
      			else {return [];}
      		};
      	});

})();
