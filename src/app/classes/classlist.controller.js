(function() {
  'use strict';

  angular
    .module('ilpBase')
    .controller('ClassListController', ClassListController);

  /** @ngInject */
  function ClassListController($log, $scope, $rootScope, $state, $stateParams, dtaClass, Ilp, dtaIlp, AuthService) {
    var vm = this;
    var console = $log;
    vm.currentClassId = $stateParams.classId;

    if (!vm.currentClassId) {
      //TODO: Raise an error
      console.log("No class ID:", vm.currentClassId);
    }
    else {
      // save the class we're looking at in the global scope
      $rootScope.currentClassId = vm.currentClassId;
    }

    // vm.currentClass = dtaClass.getClass(vm.currentClassId);
    dtaClass.getClass(vm.currentClassId)
        .then(function(result) {
            vm.currentClass = result;
            // console.log("Grabbed Class : ", result);
        }, function(err) {
            // Error occurred
            //TODO: Process error
            console.log("no class :(", err, vm.currentClassId);
        });

    // vm.studentList = dtaClass.getStudentList(vm.currentClassId);
    dtaClass.getStudentList(vm.currentClassId)
      .then(function(results) {
        // console.log("got the student list for class: ", vm.currentClassId, results);
        vm.studentList = results;
      }, function(err) {
        //TODO: Process error
        console.log("classlistcontroller: did not get student list for class: ", vm.currentClassId, err);

      });

      $scope.startIntake = function(studentID, classID) {
        
        dtaIlp.createPlanYear(studentID, vm.currentClass.idSchoolyear)
         .then(function(result) {
            console.log("posted ilp:", result);
             $state.go('ilp', {idStudent: studentID, idClass: classID});
          }, function(err){
            console.log("failed to post ilp", err);
            $scope.problem=err.statusText;
          });
        
         /*
        var ilpData = {"idSchoolyear" : vm.currentClass.idSchoolyear, 
            "idStudent": studentID,
            "sUserid": AuthService.getUserId()
          };

        console.log("new ilp", ilpData);

        Ilp
          .create(ilpData)
          .$promise
          .then(function(result) {
            console.log("posted ilp:", result);
             $state.go('ilp', {idStudent: studentID, idClass: classID});
          }, function(err){
            console.log("failed to post ilp", err);
            $scope.problem=err.statusText;
          });

*/
      };

  }
})();
