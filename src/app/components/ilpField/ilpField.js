(function() {
  'use strict';

  angular
    .module('ilpBase')
    .directive('ilpField', ilpField);


  /** @ngInject */
  function ilpField() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/ilpField/ilpField.html',
      scope: {
           datafield: '='
      },
      // link: linkFunc,
      controller: ilpFieldController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

   // function linkFunc(scope, el, attr, vm) {
        //var console = $log;
   //    // $log.debug("navbar.linkF");
   //    // $log.debug("pic: " + scope.userpic);
   //    // $log.debug("activeTab" + scope.activetab);
   //    console.log("nvabar.linkFunc", scope, el, attr, vm);
   //  }

    /** @ngInject */
    function ilpFieldController($scope,$log) {
      var vm = this;

      var console = $log;

      $scope.getHeaderColor = function(fld) {
          console.log(fld);

          if (!fld.contents) {
              return 'hilite';
          }
          return '';
        };

      console.log("ilpfield for ", vm.datafield);

    }
  }

})();
