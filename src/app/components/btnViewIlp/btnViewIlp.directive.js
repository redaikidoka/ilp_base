(function() {
  'use strict';

  angular
    .module('ilpBase')
    .directive('btnViewIlp', btnViewIlp);

  /** @ngInject */
  function btnViewIlp() {
    var directive = {
      restrict: 'E',
      replace: true,
      templateUrl: 'app/components/btnViewIlp/btnViewIlp.html',
      require: 'ngModel',
      scope: {
         student: '=',
         classid: '=',
         intakedone: '=',
         sizer: '@'
      },
      controller: btnVewIlpController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function btnVewIlpController($scope) {
      var vm = this;
      
      // var console = $log;

      // console.log('viewilpbtn for:', vm.student);
      // console.log(" in: ",vm.classid);
      // console.log("at size: ", vm.sizer); 

      $scope.getText = function() {
      	if (vm.student) {
      // console.log('viewilpbtn for:', vm.student);
      		var text = 'Start Intake';

      		if (vm.intakedone) { text = 'View ILP';}
      		else if (vm.student.hasIlp) { text = 'Continue Intake';}
      		return text;
      	}

      	return '';
      };

      $scope.getClasses = function() {
      	if (vm.sizer) { vm.addedclass = vm.sizer;}
      	else { vm.addedclass = ''; }
      	if (vm.student) {
      		var cssClasses = 'btn btn-danger ' + vm.addedclass;

      		if (vm.intakedone) { cssClasses = '';}
      		else if (vm.student.hasIlp) { cssClasses = 'btn btn-primary ' + vm.addedclass;}
      		// console.log("btnViewilp.cssClasses =", cssClasses);
      		return cssClasses;
      	}

      	return '';
      };

      $scope.getClassID = function() {
      	return vm.classid;
      };

    }
  }

})();
