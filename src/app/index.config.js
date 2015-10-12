(function() {
  'use strict';

  angular
    .module('ilpBase')
    .config(config);

  /** @ngInject */
  function config($logProvider, $rootScopeProvider) {
    // Enable log
    $logProvider.debugEnabled(true);
    $rootScopeProvider.degugging = true;

    // Set options third-party lib
    // toastr.options.timeOut = 3000;
    // toastr.options.positionClass = 'toast-top-right';
    // toastr.options.preventDuplicates = true;
    // toastr.options.progressBar = true;
  }

})();
