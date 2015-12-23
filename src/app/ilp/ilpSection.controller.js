(function() {
    'use strict';

    angular
        .module('ilpBase')
        .controller('ilpSectionController', ilpSectionController);

    /** @ngInject */
    function ilpSectionController($scope, $state, $stateParams, $log, $filter) {
        var vm = this;
        var console = $log;
        vm.sectionID = $stateParams.idSection;

        console.log("section", vm.sectionID);
        console.log("$state", $state);
        console.log("$state.$current", $state.$current);
        console.log("$state.$current.parent", $state.$current.parent);
        console.log("$state.$current.parent.plan ", $state.$current.parent.plan);
 
        // find my fields :)
        vm.myFields = $filter('filter')($scope.getFields(), {
            idSectionDef: vm.sectionID
        }, true);

        console.log("fields", vm.myFields);

        // dtaIlp.getFields(vm.plan.idIlp).then(function(fields) {
        //         vm.plan.fields = fields;
        //     });

        // if ($stateParams.idStudent) {
        //     vm.idStudent = $stateParams.idStudent;
        // }
        // else { 
        //     //TODO: Load the last student / first student? First class? Rootscope?
        //     vm.idStudent = 23; 
        // }

    } // end function ilpSectionController
})();
