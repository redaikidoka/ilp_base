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
        // .currentSectionID
        // .currentSection{}
        // 

        // ROOTSCOPE:
        //  .currentStudentID
        //  .currentClassId
        //

        var console = $log;
        // setup the variable for our student dropdown list
        $scope.selectedStudent = {};

        // setup the ILP
        $scope.ilp = {};
        //  .plan{} =>  
        //      .fields[]
        //      .student {}

        //  .structure{}
        //      .sections[]
        //      .questions[]
        //      .groups[]
        //      .fieldDefinitions[]
        //


        // load the ILP Plan structure
        loadIlpStructure();

        //
        // VERIFY the parameters
        // 

        // verify the student id
        if ($stateParams.idStudent) {
            $scope.idStudent = $stateParams.idStudent;
            // save the student we are looking at
            $rootScope.currentStudentId = $stateParams.idStudent;
        } else {
            //TODO: Load the last student / first student? First class? Rootscope?
            console.log("ilpController:: ERR no student id in the param! :(params)", $stateParams,
                "loaded: ", $rootScope.currentStudentId);
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
            console.log("ilpController:: ERR no class id. :(params)", $stateParams,
                "loaded: ", $rootScope.currentClassId);

            // if we're doing a refresh, get back to the class list
            if (!$scope.idClass) {
                console.log("ilpController:: ERR no current class - reverting");
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
            // console.log("ilp::classmate student list", results);
            $scope.setDefaultStudent($scope.idStudent);
        }, function(err) {
            //TODO: show an error here
            console.log("ilp:no students :(", err);
        });


        if ($stateParams.idSection) {
            $scope.log("ilpController:: got section ", $stateParams.idSection);
            $scope.currentSectionID = $stateParams.idSection;
            $scope.currentSection = $scope.ilp.structure.sections[arrayObjectIndexOf($scope.ilp.structure.sections, "idSectionDef", $scope.currentSectionID)];
            
        } else {
            // setting default section id
            console.log("ilp::loadFields -setting default section id to ", $scope.ilp.structure.sections[0] );
            // console.log("ilp::loadFields - f$stateParams: ", $stateParams);
            $scope.currentSectionID = $scope.ilp.structure.sections[0].idSectionDef;
            $scope.currentSection = $scope.ilp.structure.sections[0];

            // go to the first section.
            // console.log("ilp::loadFields - Go to the first section!");

            $state.go('ilp.section', {
                idSection: $scope.currentSectionID
            });
        }

            $scope.referenceSectionID = 9;
            $scope.referenceSection = $scope.ilp.structure.sections[arrayObjectIndexOf($scope.ilp.structure.sections, "idSectionDef", $scope.referenceSectionID)];
            console.log("ilpController::ReferenceSection", $scope.referenceSection);

        function loadIlpStructure() {

            // var ilpStructure = dtaIlp.getIlpStructure();

            $scope.ilp.structure = dtaIlp.getIlpStructure();

            // console.log("ilpController:: pulled the structure of the ilp", $scope.ilp.structure);
        }

 
        function loadIlp() {
            // console.log("ilpController::loadIlp() for studentid", $scope.idStudent, " Year: ", $scope.idYear);
            dtaIlp.loadPlan($scope.idStudent, $scope.idYear).then(function(plan) {
                // console.log("ilpController::loadIlp() - got the plan! ", plan);
                $scope.ilp.plan = plan;

            }, function(err) {
                // TODO: Show an error here

                // Error occurred
                console.log("ilpController::loadIlp() - plan failed to load ", err);
            });


        }


        // arrayObjectIndexOf(arr, "stevie", "hello"); // 1
        function arrayObjectIndexOf(myArray, property, searchTerm) {
            // console.log("arrayObjectIndexOf ", myArray, "Searching on ", searchTerm, )
            for(var i = 0, len = myArray.length; i < len; i++) {
                if (myArray[i][property] === searchTerm) {
                    return i; }
            }
            return -1;
        }


        $scope.scrollTo = function(id) {
            console.log('scroll to', id);
            $location.hash(id);
            $anchorScroll();
        };

        $scope.getSectionFields = function(idSection) {
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
            var found = $filter('filter')($scope.ilp.structure.questions, {
                    idFieldDef: _idFieldDef
                },
                true);

            if (found && found.length) {
                // console.log("questions for ", _idFieldDef, found);
                return found;
            } else {
                console.log("no questions for ", _idFieldDef);
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
                console.log("ilpController::setDefaultStudent didn't find ", studentId, "in the studentList", $scope.studentList);
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

        $scope.getGroupName = function(_idFieldGroup) {
            var index = arrayObjectIndexOf($scope.ilp.structure.groups, "idFieldGroup", _idFieldGroup);
            // console.log("ilpController::GetGroupName(", _idFieldGroup, ") looking in index: ", index);
            if (index >= 0) {
                return $scope.ilp.structure.groups[index].groupName;
            } else {
                return '';
            }
        };

        $scope.getGroupClass = function(_idFieldGroup) {
            // console.log("ilp::getGroupClass:idFieldGroup:", _idFieldGroup);
            if (_idFieldGroup === 10) {
                return "col-md-4 col-sm-12";
            } else {
                return "col-md-8 col-sm-12";
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
            // console.log("ilpController::checkilp");
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

            // console.log("checkilp: done?", $scope.ilp.plan.intakeDone);

            if ($scope.ilp.plan.intakeDone) {
                // console.log("calling save on the plan itself");
                dtaIlp.planDone($scope.ilp.plan.idPlan)
                    .then(function(result) {
                        $scope.ilp.plan.sUpdate = Date.now();
                        if (!result) {
                            console.log("ilpController::checkilp saved Plan", result);
                        }
                    }, function(err) {
                        // Error occurred
                        //TODO: Process error
                        console.log("ilpController::checkilp failed to save plan :(", err);
                    });

            }
        };


    }
})();
