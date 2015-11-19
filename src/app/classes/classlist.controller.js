(function() {
  'use strict';

  angular
    .module('ilpBase')
    .controller('ClassListController', ClassListController);

  /** @ngInject */
  function ClassListController($scope, $state, $stateParams, dtaClass) {
    var vm = this;

    vm.currentClassId = $stateParams.classId;

    if (!vm.currentClassId) {
      //TODO: Raise an error
      console.log("No class ID:", vm.currentClassId);
    }

    vm.currentClass = dtaClass.getClass(vm.currentClassId);
    // dtaClass.getClass(vm.currentClassId)
    //     .then(function(result) {
    //         vm.currentClass = result;
    //         console.log("Grabbed Class : ", result);
    //     }, function(err) {
    //         // Error occurred
    //         //TODO: Process error
    //         console.log("no class :(", err, vm.currentClassId);
    //     });

    // vm.studentList = dtaClass.getStudentList(vm.currentClassId);
    dtaClass.getStudentList(vm.currentClassId)
      .then(function(results) {
        // console.log("got the student list for class: ", vm.currentClassId, results);
        vm.studentList = results;
      }, function(err) {
        //TODO: Process error
        console.log("did not get studnet list for class: ", vm.currentClassId);

      });
  }
})();
