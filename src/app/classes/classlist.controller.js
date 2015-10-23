(function() {
  'use strict';

  angular
    .module('ilpBase')
    .controller('ClassListController', ClassListController);

  /** @ngInject */
  function ClassListController($scope, $state, $stateParams, dtaClass) {
    var vm = this;

    vm.currentClassId = $stateParams.classId;


    vm.currentClass = dtaClass.getClass(vm.currentClassId);
    vm.studentList = dtaClass.getStudentList(vm.currentClassId);
    console.log('a class id:', vm.currentClassId, 'class', vm.currentClass, 
    	'studnets', vm.studentList);

    // vm.currentSchoolYear = "2015/2016";
    // vm.currentClassId = 2;
    // var cl = [];
    // cl = dtaClass.getClassList();
    // vm.classList = cl;
    // vm.currentClass = cl[1];
    
  }
})();
