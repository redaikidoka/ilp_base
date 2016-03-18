(function() {
    'use strict';

    angular
        .module('ilpBase')
        .controller('IlpController', IlpController);

    /** @ngInject */
    function IlpController($scope, $rootScope, $stateParams, $state, $log, dtaIlp, dtaClass, $filter, $anchorScroll, $location) {
        // .idStudent
        // .idClass
        // .idYear
        // .currentClass{}
        // .studentList{}
        // 
        var console = $log;

        $scope.ilp = {};
        // .ilp.student
        // .ilp.sections
        // .ilp.questions
        // .ilp.plan =>  ilp.plan.fields

        // setup the variable for our student dropdown list
        $scope.selectedStudent = {};

        // verify the student id
        if ($stateParams.idStudent) {
            $scope.idStudent = $stateParams.idStudent;
            // save the student we are looking at
            $rootScope.currentStudentId = $stateParams.idStudent;
        } else {
            //TODO: Load the last student / first student? First class? Rootscope?
            $scope.idStudent = $rootScope.currentStudentId;
            //TODO: Load the first student in the class
        }

        // fetch and store the class info
        if ($stateParams.idClass) {
            $scope.idClass = $stateParams.idClass;
            // save the class we are looking at
            $rootScope.currentClassId = $stateParams.idClass;
        } else {
            $scope.idClass = $rootScope.currentClassId;
            console.log("ilp: no class id. :(params)", $stateParams,
                "loaded: ", $rootScope.currentClassId);

            // if we're doing a refresh, get back to the class list
            if (!$scope.idClass) {
                console.log("no current class - reverting");
                $state.go('myclasses');
            }
        }

        // get the class for this student
        dtaClass.getClass($scope.idClass).then(function(results) {
            // console.log("ilp: loaded class", results);
            $scope.currentClass = results;
            $scope.idYear = results.idSchoolyear;

            // load the ilp
            loadIlp();
        }, function(err) {
            //TODO: show an error here
            console.log("ilp:no class :(", err);
        });

        // grab that class' list of students
        dtaClass.getStudentList($scope.idClass).then(function(results) {
            $scope.studentList = results;
        }, function(err) {
            //TODO: show an error here
            console.log("ilp:no students :(", err);
        });

        function loadIlp() {

            // fetch the student  ::: $SCOPE.ILP.STUDENT
            dtaIlp.getStudent($scope.idStudent, $scope.idYear).then(function(results) {
                $scope.ilp.student = results;

                $scope.setDefaultStudent(results.idStudent);

            }, function(err) {
                // TODO: Show an error here

                // Error occurred
                console.log("no student. :(", err);
            });

            // fetch the plan ::: $SCOPE.ILP.PLAN
            dtaIlp.getPlanYear($scope.idStudent, $scope.idYear).then(function(result) {
                $scope.ilp.plan = result;
                // console.log("ilp.plan:: ", $scope.ilp.plan);
                loadFields(result.idIlp);

            }, function(err) {
                // Error occurred

                console.log("no plan - creating", err);

                // create the Plan
                dtaIlp.createPlanYear($scope.idStudent, $scope.currentClass.idSchoolyear)
                    .then(function(result) {
                        $scope.ilp.plan = result;
                        console.log("ilp.newplan::", $scope.ilp.plan);
                        loadFields(result.idIlp);
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
                // console.log("ilp.plan.fields", fields);
                $scope.checkilp();


                // get the section list
                dtaIlp.getSections().then(function(sexions) {
                    // console.log("ilp.plan.sexions", sexions);
                    $scope.ilp.sections = sexions;

                    if ($stateParams.idSection) {
                        $scope.currentSectionID = $stateParams.idSection;
                    } else {
                        // setting default section id
                        // console.log("setting default section id to ", sexions[0].idSectionDef );
                        // console.log("$stateParams: ", $stateParams);
                        $scope.currentSectionID = sexions[0].idSectionDef;

                        // go to the first section.
                        $state.go('ilp.section', {
                            idSection: sexions[0].idSectionDef
                        });
                    }

                    // getQuestions ::: $SCOPE.ILP.QUESTIONS
                    dtaIlp.getQuestions().then(function(result) {
                        $scope.ilp.questions = result;
                        // console.log("ilp.questions: ", $scope.ilp.questions);
                        
                        // load questions into fields
                        for (var i =0;i<$scope.ilp.plan.fields.length;i++){
                            $scope.ilp.plan.fields[i].questions = dtaIlp.getQuestionforFieldDefId($scope.ilp.plan.fields[i].idFieldDef);
                        }

                    }, function(err) {
                        console.log("ilp failed to get questions", err);
                        $scope.problem = err.statusText;
                    });


                }, function(err) {
                    console.log("no sections. :(", err);
                });


            }, function(err) {
                console.log("couldn't load fields", err);
            });
        }

        $scope.scrollTo = function(id) {
            // console.log('scroll to', id);
            $location.hash(id);
            $anchorScroll();
        };

        $scope.getFields = function(idSection) {
            if (!idSection) {
                console.log("ilp::getFields: no Section id. :(", idSection);
                return null;
            }

            if (!$scope.ilp) {
                console.log("ilp::getFields: no $scope.ilp :(");
                return null;
            }

            if (!$scope.ilp.plan) {
                console.log("ilp::getFields: no $scope.ilp.plan :(");
                return null;
            }

            if (!$scope.ilp.plan.fields) {
                console.log("ilp::getFields: no $scope.ilp.plan.fields :(");
                return null;
            }


            console.log("getfields for:", idSection);

            return $filter('filter')($scope.ilp.plan.fields, {
                    idSectionDef: idSection
                },
                true);

        };

        $scope.getQuestions = function(_idFieldDef) {
            var found = $filter('filter')($scope.ilp.questions, {
                    idFieldDef: _idFieldDef
                },
                true);

            if (found && found.length) {
                // console.log("questions for ", _idFieldDef, found);
                return found;
            } else {
                // console.log("no questions for ", _idFieldDef);
                // console.log("the questions", $scope.ilp.questions)
                return null;
            }
        };

        $scope.setDefaultStudent = function(studentId) {
            // console.log("looking for student: ", studentId);
            var found = $filter('filter')($scope.studentList, {
                idStudent: studentId
            }, true);
            if (found && found.length) {
                $scope.selectedStudent = found[0];
            } else {
                $scope.selectedStudent = null;
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
            if (fld.fieldType === "TS") {
                return "col-lg-3 col-sm-4 col-xs-12";
            } else {
                return "col-lg-3 col-sm-6 col-xs-12";
            }
        };

        $scope.getStudentPhoto = function(picture) {
            var imagepath = "/assets/images/";
            // return their picture if we have one
            if (picture) {
                return imagepath + "students/" + picture;
            }

            // if there's no student,return blank.
            if (!$scope.ilp.student) {
                return '';
            }

            //placeholder
            if ($scope.ilp.student.gender) {
                if ($scope.ilp.student.gender.substring(0, 1).toUpperCase() === "F") {
                    return imagepath + "placeholder/" + "female.jpg";
                } else {
                    return imagepath + "placeholder/" + "male.jpg";
                }
            } else {
                return imagepath + "placeholder/" + "cat.jpg";
            }


        };

        $scope.checkilp = function() {

            if (!$scope.ilp.plan || !$scope.ilp.plan.fields) {
                return false;
            }
            if ($scope.ilp.plan.intakeDone) {
                return true;
            }

            $scope.ilp.plan.intakeDone = true;

            for (var i = 0; i < $scope.ilp.plan.fields.length; i++) {
                if ($scope.ilp.plan.fields[i].idSectionDef === 1 && !$scope.ilp.plan.fields[i].contents) {
                    $scope.ilp.plan.intakeDone = false;
                    return;
                }
            }

            console.log("checkilp: done?", $scope.ilp.plan.intakeDone);

            if ($scope.ilp.plan.intakeDone) {
                $scope.ilp.plan.$save();
            }
        };


    }
})();
