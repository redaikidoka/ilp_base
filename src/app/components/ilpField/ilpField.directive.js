(function() {
  'use strict';

  angular
    .module('ilpBase')
    .directive('ilpField', ilpField);


  /** @ngInject */
  function ilpField() {
    var directive = {
      restrict: 'E',
      replace: true,
      templateUrl: 'app/components/ilpField/ilpField.html',
      require: 'ngModel',
      scope: {
         datafield: '=',
         onchangecallback: "&"
      },
      // link: linkField,
      controller: ilpFieldController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;


    /** @ngInject */
    function ilpFieldController($scope, $element, $attrs, $location, $log, AuthService, dtaIlp) {
      var vm = this;
      
      //setup logging
      var console = $log;
      // if ($scope.datafield) {
      //  $scope.myQuestions = dtaIlp.getQuestionforFieldDefId($scope.datafield.idFieldDef);
      // }
      $scope.showQuestions = 0;

      // console.log("for this field def id", $scope.datafield, " i got these questions: ", $scope.myQuestions);

      $scope.getHeaderColor = function(fld) {
         // console.log(fld);

          if (!fld.contents) {
              return 'hilite';
          }
          return '';
        };

        $scope.getRows = function() {
          // for SHORT TEXT fields (TS), rows = 1
          if(vm.datafield.fieldType === "TS") { return 2;}
          // console.log("regular field", vm.datafield);
          return 8;
        };

        $scope.editField = function() {
          // console.log("field we are saving:", vm.datafield);
          
          // var results = dtaIlp.updateFieldItem(vm.datafield);
          // console.log("save results:", results);
          dtaIlp.updateFieldItem(vm.datafield).then(function(results){
                // console.log("ilpField: result of update:", results);
                vm.datafield.sUserId=AuthService.getUserId();
                vm.datafield.sUpdate = results.sUpdate; Date.now();

                // console.log("update function: ", $scope.onchangecallback);
                // $parent.$scope.checkilp();
                if (vm.onchangecallback) {
                  vm.onchangecallback(); 
                }
            }, function(err) {
                // TODO: Show an error here

                // Error occurred
                console.log("No update :(", err);
            });
        };
    }
  }

})();
