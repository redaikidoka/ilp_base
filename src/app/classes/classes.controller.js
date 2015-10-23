(function() {
  'use strict';

  angular
    .module('ilpBase')
    .controller('ClassesController', ClassesController);

  /** @ngInject */
  function ClassesController(dtaClass) {
    var vm = this;
    vm.currentSchoolYear = "2015/2016";
    vm.currentClassId = 2;
    vm.classList = dtaClass.getClassList();
    vm.currentClass = vm.classList[1];
    
  }
})();
