(function() {
  'use strict';

  angular
    .module('ilpBase')
    .controller('FeedController', FeedController);

  /** @ngInject */
  function FeedController() {
    var vm = this;

    vm.user = "";

  }
})();
