(function() {
    'use strict';

    angular
        .module('ilpBase')
        .controller('IlpController', IlpController);

    /** @ngInject */
    function IlpController($scope, $stateParams, $log, dtaIlp) {
        var vm = this;
        var console = $log;

        // console.log("ilpController: ");
        if ($stateParams.idStudent) {
            vm.idStudent = $stateParams.idStudent;
        }
        else { 
            //TODO: Load the last student / first student? First class? Rootscope?
            vm.idStudent = 17; 
        }
        console.log("student id: ", vm.idStudent, $stateParams);     
        
        $scope.getHeaderColor = function(fld) {
            //console.log(fld);

            if (!fld.contents) {
                return 'hilite';
            }
            return '';
        };


        vm.plan = dtaIlp.getPlan(vm.idStudent);
        vm.student = dtaIlp.getStudent(vm.idStudent);
    
    }
})();
