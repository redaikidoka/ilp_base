(function() {
    'use strict';

    angular
        .module('ilpBase')
        .controller('ClassListController', ClassListController);

    /** @ngInject */
    function ClassListController($log, $scope, $rootScope, $state, $stateParams, dtaClass, AuthService) {
        //setup
        var vm = this;
        var console = $log;
        vm.currentClassId = $stateParams.classId;

        // vm.selectedAddProspect = {};
        // $scope.selectedAddProspect = {};

        vm.studentList = [];

        // $scope.problem = null;
        vm.hasProblem = 0;
        vm.problem = "";
        if (!vm.currentClassId) {
            //TODO: Raise an error
            console.log("No class ID:", vm.currentClassId);
        } else {

        }

        // vm.currentClass = dtaClass.getClass(vm.currentClassId);
        dtaClass.getClass(vm.currentClassId)
            .then(function(result) {
                vm.currentClass = result;
                console.log("Grabbed Class : ", result);

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

        $scope.toggleAddStudent = function() {
            $scope.showAdd = !$scope.showAdd;

            if (vm.fullStudentList && vm.fullStudentList.length > 0) {
                console.log("Got the list already!");
            } else {
                dtaClass.getYearStudentList(vm.currentClass.idSchoolyear)
                    .then(function(results) {
                        console.log("got the student list for year: ", vm.currentClass.idSchoolyear, results);
                        vm.fullStudentList = results;
                    }, function(err) {
                        //TODO: Process error
                        console.log("classlistcontroller: did not get student list for class: ", vm.currentClassId, err);
                        $scope.problem = err;
                    });
            } // else
        };

        $scope.addStudent = function() {
            // get the selected items in the <select>
            if (!vm.selectedAddProspect || vm.selectedAddProspect.length === 0) {
                console.log("no students selected");
                vm.problem = "No students Selected";
                $scope.showAdd = 0;
            }
            // console.log(vm.selectedAddProspect);
            // add them 1 by 1 to the class
            angular.forEach(vm.selectedAddProspect, function(prospect) {
                console.log("prospect: ", prospect);
                dtaClass.addClassStudent(vm.currentClass.idClass, prospect.idStudent)
                    .then(function(results) {
                        console.log("added the student: ", results);
                        // vm.studentList = results;
                    }, function(err) {
                        //TODO: Process error
                        console.log("couldn't add: ", err);

                    });

            });
            // refresh the class list?
        };

        $scope.dismissProblem = function() {
            vm.problem = "";
            vm.hasProblem = 0;
        };

        $scope.editClassDescription = function() {

            // console.log("editing class description: ", vm.currentClass);

            dtaClass.updateClassDescription(vm.currentClass.idClass, vm.currentClass.description)
                .then(function() {
                    // console.log("classlist.updateClassDescription: ", results);
                    vm.currentClass.sUserId = AuthService.getUserId();
                    vm.currentClass.sUpdate = Date.now();
                    // console.log("now vs supdate", Date.now(), results);

                }, function(err) {
                    // TODO: Show an error here

                    // Error occurred
                    console.log("No update :(", err);
                });
        };
    }
})();
