(function() {
  'use strict';

  angular
      .module('ilpBase')
      .controller('ClassesController', ClassesController);

  /** @ngInject */
  function ClassesController(dtaClass, $state, $log) {
      var vm = this;
      vm.currentSchoolYear = dtaClass.getSchoolYear();
      var console = $log;
      // grab the class list
      dtaClass.getClassList()
        .then(function(result) {
            vm.classList = result;
            // console.log("Grabbed Class list: ", vm.classList);
            $state.go('myclasses.class', {classId: vm.classList[0].idClass});
        }, function(err) {
            // Error occurred
            //TODO: Show an error
            console.log("no class list. :(", err);
        });


  }
})();
