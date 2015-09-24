(function() {
  'use strict';

  angular
    .module('ilpBase')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
