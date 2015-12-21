(function() {
    'use strict';

    angular
        .module('ilpBase')
        .controller('IlpController', IlpController);

    /** @ngInject */
    function IlpController($scope, $rootScope, $stateParams, $state, $log, 
            dtaIlp, dtaClass, $filter) {
        var vm = this;
        // .idStudent
        // .idClass
        // .currentClass{}
        // .studentList{}
        // 
        var console = $log;
        vm.ilp = null;
        // .ilp.student, .ilp.plan, .ilp.plan.sections, ilp.plan.fields

        // setup the variable for our student dropdown list
        vm.selectedStudent = null;

        // verify the student id
        if ($stateParams.idStudent) {
            vm.idStudent = $stateParams.idStudent;
            // save the student we are looking at
            $rootScope.currentStudentId = vm.idStudent;
        } else {
            //TODO: Load the last student / first student? First class? Rootscope?
            // vm.idStudent = 23; 
            vm.idStudent = $rootScope.currentStudentId;

            //TODO: Load the first student in the class
        }

        // fetch and store the class info
        if ($stateParams.idClass) {
            vm.idClass = $stateParams.idClass;
            // save the class we are looking at
            $rootScope.currentClassId = vm.idClass;
        } else {

            vm.idClass = $rootScope.currentClassId;
            console.log("ilp: no class id. :(params)", $stateParams, 
                "loaded: ", vm.idClass);

            // if we're doing a refresh, get back to the class list
            if (!vm.idClass) {
                $state.go('myclasses');
            }
        }

        // get the class for this student
        dtaClass.getClass(vm.idClass).then(function(results) {
            // console.log("ilp: loaded class", results);
            vm.currentClass = results;

            // load the ilp
            // vm.ilp = dtaIlp.loadPlan(vm.idStudent, vm.currentClass.idSchoolyear);
            loadIlp();
            console.log("the ilp: ", vm.ilp);
        }, function(err) {
            //TODO: show an error here
            console.log("ilp:no class :(", err);
        });

        // grab that class' list of students
        dtaClass.getStudentList(vm.idClass).then(function(results) {
            // console.log("ilp: loaded students", results);
            vm.studentList = results;
        }, function(err) {
            //TODO: show an error here
            console.log("ilp:no students :(", err);
        });

        function loadIlp() {

            // fetch the student
            dtaIlp.getStudent(vm.idStudent).then(function(results) {
                console.log("ilp:Got a student!", results);
                vm.ilp.student = results;

                $scope.setDefaultStudent(vm.student.idStudent);

            }, function(err) {
                // TODO: Show an error here

                // Error occurred
                console.log("no student. :(", err);
            });

            // fetch the plan
            dtaIlp.getPlan(vm.idStudent).then(function(results) {
                vm.ilp.plan = results;
                // console.log("the plan I got back", vm.plan);

                loadFields();


            }, function(err) {
                // Error occurred

                console.log("no plan - creating", err);

                // create the Plan
                dtaIlp.createPlanYear(vm.idStudent, vm.currentClass.idSchoolyear)
                    .then(function(result) {
                        // console.log("posted ilp:", result);
                        vm.plan = result;
                        loadFields();
                        // $state.go('ilp', {idStudent: vm.idStudent, idClass: classID});
                    }, function(err) {
                        // TODO: Show an error here
                        console.log("failed to post ilp", err);
                        $scope.problem = err.statusText;
                    });
            });

            // get the section list
            dtaIlp.getSections().then(function(sexions) {
                vm.ilp.plan.sections = sexions;

                if ($stateParams.idSection) {
                    vm.currentSectionID = $stateParams.idSection;
                }
                else {
                    vm.currentSectionID = vm.sexions[0].idSectionDef;
                }
            }, function(err) {
                console.log("no sections. :(", err);
            });


        }

        function loadFields() {
            // console.log("loading fields");
            dtaIlp.getFields(vm.plan.idIlp).then(function(fields) {
                vm.ilp.plan.fields = fields;
                console.log("fields", fields);
                $scope.checkilp();
            });
        }

        $scope.getFields = function(idSection) {
            if(vm && vm.plan && vm.plan.fields){
                return $filter('filter')(vm.plan.fields, 
                    {idSectionDef: idSection}, 
                    true);
            }
            // return vm.plan.fields;
        };

        $scope.setDefaultStudent = function(studentId) {
            // console.log("looking for student: ", studentId);
            var found = $filter('filter')(vm.studentList, {
                idStudent: studentId
            }, true);
            if (found && found.length) {
                vm.selectedStudent = found[0];
            } else {
                vm.selectedStudent = null;
            }

            // console.log("found:", found);
        };

        // if there are field contents', we turn green
        $scope.getHeaderColor = function(fld) {
            if (!fld.contents) {
                return 'hilite';
            }
            return '';
        };

        $scope.getStudentPhoto = function(picture) {
            var imagepath = "/assets/images/";
            // return their picture
            if (picture) {
                return imagepath + "students/" + picture;
            }

            // if there's no student,return blank.
            if (!vm.student) {
                return '';
            }

            //placeholder
            if (vm.student.gender) {
                if (vm.student.gender.substring(0, 1).toUpperCase() === "F") {
                    return imagepath + "placeholder/" + "female.jpg";
                } else {
                    return imagepath + "placeholder/" + "male.jpg";
                }
            } else {
                return imagepath + "placeholder/" + "cat.jpg";
            }


        };

        $scope.checkilp = function() {
            // console.log("checkingthe ILP", vm.plan, vm.plan.fields, vm.plan.intakeDone);

            if (!vm.plan || !vm.plan.fields) {
                return false;
            }
            if (vm.plan.intakeDone) {
                return true;
            }

            vm.plan.intakeDone = true;

            for (var i = 0; i < vm.plan.fields.length; i++) {
                if (!vm.plan.fields[i].contents) {
                    vm.plan.intakeDone = false;
                    return;
                }
            }

            console.log("done?", vm.plan.intakeDone);
            if (vm.plan.intakeDone) {
                vm.plan.$save();
            }
        };

        // $scope.switchIlp = function() {
        //     console.log('switch ilp to: ', vm.selectedStudent.idStudent, vm.idClass);

        //     $state.go('ilp', {
        //         idStudent: vm.selectedStudent.idStudent,
        //         idClass: vm.idClass
        //     });

        // };


    }
})();
