(function() {
  'use strict';

  angular
      .module('ilpBase')
      .controller('ClassesController', ClassesController);

  /** @ngInject */
  function ClassesController(dtaClass, $state, $log, ConfigService) {
    // vm.currentSchoolYearId
    // vm.currentSchoolYear
    // vm.classList

      var vm = this;
      var console = $log;
      

      vm.currentSchoolYearId = ConfigService.getCurrentYearId();
      vm.currentSchoolYear = ConfigService.getCurrentYear();
      // grab the class list
      dtaClass.getClassList(vm.currentSchoolYearId)
        .then(function(result) {
            vm.classList = result;
            console.log("Grabbed Class list: ", vm.classList);

            $state.go('myclasses.class', {classId: vm.classList[0].idClass});
        }, function(err) {
            // Error occurred
            //TODO: Show an error
            console.log("no class list. :(", err);
        });


  }
})();
