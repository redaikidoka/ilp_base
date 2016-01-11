(function() {
  'use strict';

  angular
    .module('ilpBase')
    .controller('ClassListController', ClassListController);

  /** @ngInject */
  function ClassListController($log, $scope, $rootScope, $state, $stateParams, dtaClass) {
    //setup
    var vm = this;
    var console = $log;
    vm.currentClassId = $stateParams.classId;
    vm.selectedAddStudent = null;
    vm.studentList = [];
    vm.fullStudentList= [];
    $scope.problem = null;

    if (!vm.currentClassId) {
      //TODO: Raise an error
      console.log("No class ID:", vm.currentClassId);
    }
    else {

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
        console.log("got the student list for class: ", vm.currentClassId, results);
        vm.studentList = results;
      }, function(err) {
        //TODO: Process error
        console.log("classlistcontroller: did not get student list for class: ", vm.currentClassId, err);

      });

      $scope.addStudent = function() {

      };

      $scope.addStudent = function() {
      	$scope.showAdd = !$scope.showAdd;

      	if (vm.fullStudentList) {

      	}
      	else {
      		dtaClass.getFullStudentList(vm.currentClass.idSchoolYear, vm.currentClass.grade)
		       .then(function(results) {
		        console.log("got the student list for year/grade: ", vm.currentClass.idSchoolYear, vm.currentClass.grade, results);
		        vm.fullStudentList = results;
		      }, function(err) {
		        //TODO: Process error
		        console.log("classlistcontroller: did not get student list for class: ", vm.currentClassId, err);
		        $scope.problem = err;
		      });
     	}
      }
  }
})();
