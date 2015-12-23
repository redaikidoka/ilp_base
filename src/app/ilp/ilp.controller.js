(function() {
    'use strict';

    angular
        .module('ilpBase')
        .controller('IlpController', IlpController);

    /** @ngInject */
    function IlpController($scope, $rootScope, $stateParams, $state, $log, dtaIlp, dtaClass, $filter) {
        var vm = this;
        // .idStudent
        // .idClass
        // .idYear
        // .currentClass{}
        // .studentList{}
        // 
        var console = $log;
        vm.ilp = {};
        $scope.ilp = {};
        // .ilp.student, .ilp.sections
        // .ilp.plan =>  ilp.plan.fields

        // setup the variable for our student dropdown list
        vm.selectedStudent = null;
        $scope.selectedStudent = {};

        // verify the student id
        if ($stateParams.idStudent) {
            vm.idStudent = $stateParams.idStudent;
            $scope.idStudent = $stateParams.idStudent;
            // save the student we are looking at
            $rootScope.currentStudentId = $stateParams.idStudent;
        } else {
            //TODO: Load the last student / first student? First class? Rootscope?
            // vm.idStudent = 23; 
            vm.idStudent = $rootScope.currentStudentId;
            $scope.idStudent = $rootScope.currentStudentId;
            //TODO: Load the first student in the class
        }

        // fetch and store the class info
        if ($stateParams.idClass) {
            vm.idClass = $stateParams.idClass;
            $scope.idClass = $stateParams.idClass;
            // save the class we are looking at
            $rootScope.currentClassId = $stateParams.idClass;
        } else {

            vm.idClass = $rootScope.currentClassId;
            $scope.idClass = $rootScope.currentClassId;
            console.log("ilp: no class id. :(params)", $stateParams,
                "loaded: ", $rootScope.currentClassId);

            // if we're doing a refresh, get back to the class list
            if (!vm.idClass) {
                console.log("no current class - reverting");
                $state.go('myclasses');
            }
        }

        // get the class for this student
        dtaClass.getClass(vm.idClass).then(function(results) {
            // console.log("ilp: loaded class", results);
            vm.currentClass = results;
            vm.idYear = results.idSchoolyear;

            $scope.currentClass = results;
            $scope.idYear = results.idSchoolyear;

            // load the ilp
            // vm.ilp = dtaIlp.loadPlan(vm.idStudent, vm.currentClass.idSchoolyear);
            loadIlp();
            // console.log("the ilp: ", vm.ilp);
        }, function(err) {
            //TODO: show an error here
            console.log("ilp:no class :(", err);
        });

        // grab that class' list of students
        dtaClass.getStudentList(vm.idClass).then(function(results) {
            // console.log("ilp: loaded students", results);
            vm.studentList = results;

            $scope.studentList = results;
        }, function(err) {
            //TODO: show an error here
            console.log("ilp:no students :(", err);
        });

        function loadIlp() {

            // fetch the student
            // console.log("fetcing student ", vm.idStudent, " year", vm.idYear);
            dtaIlp.getStudent(vm.idStudent, vm.idYear).then(function(results) {
                // console.log("ilp:Got a student!", results);
                vm.ilp.student = results;
                $scope.ilp.student = results;

                $scope.setDefaultStudent(results.idStudent);

            }, function(err) {
                // TODO: Show an error here

                // Error occurred
                console.log("no student. :(", err);
            });

            // fetch the plan
            dtaIlp.getPlanYear(vm.idStudent, vm.idYear).then(function(result) {
                vm.ilp.plan = result;
                $scope.ilp.plan = result;
                // console.log("the plan I got back", vm.plan);

                loadFields(result.idIlp);


            }, function(err) {
                // Error occurred

                console.log("no plan - creating", err);

                // create the Plan
                dtaIlp.createPlanYear(vm.idStudent, vm.currentClass.idSchoolyear)
                    .then(function(result) {
                        // console.log("posted ilp:", result);
                        vm.ilp.plan = result;
                        $scope.ilp.plan = result;

                        loadFields(result.idIlp);
                        // $state.go('ilp', {idStudent: vm.idStudent, idClass: classID});
                    }, function(err) {
                        // TODO: Show an error here
                        console.log("failed to post ilp", err);
                        $scope.problem = err.statusText;
                    });
            });

        }

        function loadFields(idIlp) {
            // console.log("loading fields");
            dtaIlp.getFields(idIlp).then(function(fields) {
                $scope.ilp.plan.fields = fields;
                vm.ilp.plan.fields = fields;
                // console.log("fields", fields);
                $scope.checkilp();


                // get the section list
                dtaIlp.getSections().then(function(sexions) {
                    // console.log("sexions", sexions);
                    // vm.sections = sexions;
                    $scope.ilp.sections = sexions;

                    if ($stateParams.idSection) {
                        // vm.currentSectionID = $stateParams.idSection;
                        $scope.currentSectionID = $stateParams.idSection;
                    } else {
                        // setting default section id
                        // console.log("setting default section id to ", sexions[0].idSectionDef );
                        // console.log("$stateParams: ", $stateParams);
                        // vm.currentSectionID = sexions[0].idSectionDef;
                        $scope.currentSectionID = sexions[0].idSectionDef;
 
                        // go to the first section.
                        $state.go('ilp.section', {
                            idSection: sexions[0].idSectionDef
                        });
                    }
                }, function(err) {
                    console.log("no sections. :(", err);
                });


            }, function(err) {
                console.log("couldn't load fields", err);
            });
        }

        $scope.getFields = function(idSection) {
            if (!idSection) {
                console.log("ilp::getFields: no Section id. :(", idSection);
                return null;
            }
            
            if (!$scope.ilp ) {
                console.log("ilp::getFields: no $scope.ilp :(");
                return null;
            }

            if (!$scope.ilp.plan){
                console.log("ilp::getFields: no $scope.ilp.plan :(");
                return null;
            }

            if (!$scope.ilp.plan.fields){
                console.log("ilp::getFields: no $scope.ilp.plan.fields :(");
                return null;
            }


            console.log("getfields for:", idSection);

            return $filter('filter')($scope.ilp.plan.fields, {
                        idSectionDef: idSection
                    },
                    true);

           // return vm.plan.fields;
        };

        $scope.setDefaultStudent = function(studentId) {
            // console.log("looking for student: ", studentId);
            var found = $filter('filter')($scope.studentList, {
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

        $scope.getFieldClass = function(fld) {
            if (fld.fieldType === "TS") { return "col-md-3 col-sm-4";}
            else { return "col-md-4 col-sm-12";}
        }

        $scope.getStudentPhoto = function(picture) {
            var imagepath = "/assets/images/";
            // console.log("picture: ", picture)
            // return their picture
            if (picture) {
                return imagepath + "students/" + picture;
            }

            // if there's no student,return blank.
            if (!$scope.ilp.student) {
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

            if (!$scope.ilp.plan || !$scope.ilp.plan.fields) {
                return false;
            }
            if ($scope.ilp.plan.intakeDone) {
                return true;
            }

            $scope.ilp.plan.intakeDone = true;

            for (var i = 0; i < $scope.ilp.plan.fields.length; i++) {
                if ($scope.ilp.plan.fields[i].idSectionDef === 1 && !$scope.ilp.plan.fields[i].contents) {
                    vm.plan.intakeDone = false;
                    return;
                }
            }

            console.log("checkilp: done?", $scope.ilp.plan.intakeDone);
            if ($scope.ilp.plan.intakeDone) {
                $scope.ilp.plan.$save();
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
