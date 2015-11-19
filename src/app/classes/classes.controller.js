(function() {
    'use strict';

    angular
        .module('ilpBase')
        .controller('ClassesController', ClassesController);

    /** @ngInject */
    function ClassesController(dtaClass) {
        var vm = this;
        vm.currentSchoolYear = dtaClass.getSchoolYear();

        // grab the class list
        dtaClass.getClassList()
            .then(function(result) {
                vm.classList = result;
                console.log("Grabbed Class list: ", vm.classList);
            }, function(err) {
                // Error occurred
                console.log("no class list. :(");
            });


    }
})();
