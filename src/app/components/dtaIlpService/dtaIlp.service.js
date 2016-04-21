(function() {
    'use strict';

    angular
        .module('ilpBase')
        .service('dtaIlp', dtaIlp);

    /** @ngInject */
    function dtaIlp($log, $q, $filter, IlpPlan, VwClassStudentsWithIlp, IlsSectionDef, VwIlpFields, IlpField, AuthService, IlsFieldQuestions, IlsFieldGroup, IlsFieldDef) {
        var console = $log;

        var ilpStructure = {};
        var ilpCurrentPlan = {};

        loadStructure();


        // 
        // Exposed Functions
        //
        this.getIlpStructure = getIlpStructure;

        // this.createPlan = createPlan;
        this.loadPlan = loadPlan;
        this.createPlanforYear = createPlanYear;
        // this.getPlan = getPlan;
        // this.getPlanbyStudentYear = getPlanYear;
        // this.getStudent = getStudent;
        // this.getFields = getFields;
        // this.getSections = getSections;
        // this.getQuestions = getQuestions;
        // this.getQuestionforFieldDefId = getQuestionforFieldDefId;

        this.updateFieldItem = updateFieldItem;
        this.updateField = updateField;
        this.planDone = planDone;


        //  ilpCurrentPlan{}
        //      .fields[]
        //      .student{}

        //  ilpStructure{}
        //      .sections[]
        //      .questions[]
        //      .groups[]
        //      .fieldDefinitions[]

        // heands the structure to the outside
        function getIlpStructure() {
            if (ilpStructure) {
                return ilpStructure;
            }
            else { 
                console.log("dtaIlp::getIlpStructure ERROR: NO STRUCTURE::");
                return null;
            }
        }

        function loadStructure() {
            // we can just hang onto these - they don't change.

            IlsSectionDef.find().$promise
                .then(function(result) {
                    ilpStructure.sections = result;
                    // console.log("dtaIlp::loadStructure downloaded ILP Sections : ", ilpStructure.sections);
                }, function(err) {
                    // Error occurred
                    //TODO: Process error
                    console.log("dtaIlp::loadStructure no sections in dtaILP :(", err);
                });

            IlsFieldQuestions.find().$promise
                .then(function(questions) {
                    ilpStructure.questions = questions;
                    // console.log("dtaIlp::loadStructure downloaded ILP Questions ", ilpStructure.questions);
                }, function(err) {
                    //TODO: process error
                    console.log("dtaIlp::loadStructure No questions. :(", err);

                });

            IlsFieldGroup.find().$promise
                .then(function(groups) {
                    ilpStructure.groups = groups;
                    // console.log("dtaIlp::loadStructure downloaded ILP Groups", ilpStructure.groups);
                }, function(err) {
                    //TODO: PROCESS ERROR
                    console.error("dtaIlp::loadStructure no groups for the ILP!", err);
                });

            IlsFieldDef.find().$promise
                .then(function(fieldDefs) {
                    ilpStructure.fieldDefinitions = fieldDefs;
                    console.log("dtaIlp::loadStructure downloaded ILP field definitions", ilpStructure.fieldDefinitions);
                    calculateIlpStructureInfo();
                }, function(err) {
                    //TODO: PROCESS ERROR
                    console.error("dtaIlp::loadStructure no Field Definitions for the ILP!", err);
                });

        }

        function calculateIlpStructureInfo() {
            // console.log("dtaIlp::calculateIlpStructureInfo() loading questions into Field Definitions" );
            for (var fd=0; fd<ilpStructure.fieldDefinitions.length;fd++ ){
                var _idFieldDef = ilpStructure.fieldDefinitions[fd].idFieldDef;
                var found = $filter('filter')(ilpStructure.questions, 
                    {
                    idFieldDef: _idFieldDef
                    },
                    true);
               if (found && found.length) {
                    // console.log("dtaIlp::calculateIlpStructureInfo questions for ", _idFieldDef, found);
                    ilpStructure.fieldDefinitions[fd].questions = found;
                } else {
                    // console.log("dtaIlp::calculateIlpStructureInfo() no questions for ", _idFieldDef);
                    // console.log("the questions", $scope.ilp.questions)
                }


            }

        }


        // function loadQuestions() {

        //     console.log("loading questions for plan", $scope.ilpCurrentPlan);
        //     var fields = $scope.ilpCurrentPlan.fields;
        //     console.log("loading questions for fields", fields);
        //     for (var f=0;f<fields.length;f++)
        //     {
        //         fields[f].questions = $scope.getQuestions(fields[f].idFieldDef);
        //     }


        // }

        function loadPlan(_idStudent, _idYear) {
            // RETURNS a promise for an ilp object
            //  .plan{} =>  
            //      .fields[]
            //      .student {}

            var deferred = $q.defer();

            if (!_idStudent || !_idYear) {
                ilpCurrentPlan = null;
                console.log("dtaIlp.loadPlan:: _idStudent", _idStudent, "_idYear", _idYear);
                return deferred.reject("missing parameter");

            }

            // check to see if we have it already
            // if (ilpCurrentPlan && ilpCurrentPlan.student) {
            //     if (ilpCurrentPlan.idStudent === _idStudent &&
            //         ilpCurrentPlan.idSchoolYear === _idYear &&
            //         ilpCurrentPlan.student.idStudent === _idStudent) {
            //          deferred.resolve(ilpCurrentPlan);
            //     }
            // }

            // clear the way
            ilpCurrentPlan = {};

            // load the student
            getStudent(_idStudent)
                .then(function(student) {
                    // console.log("ilp:Got a student!", results);
                    // ilpCurrentPlan.student = student;

                    // load the ilp record
                    getPlanYear(_idStudent, _idYear).then(function(plan) {
                        ilpCurrentPlan = plan;
                        ilpCurrentPlan.student = student;

                        getFields(ilpCurrentPlan.idPlan).then(function(fields) {
                            ilpCurrentPlan.fields = fields;
                            // console.log("dtaIlp::LoadPlan got fields", fields);

                             calculateIlpInfo();

                             deferred.resolve(ilpCurrentPlan);
                        }, function(err) {
                            console.log("dtaIlp::LoadPlan() - couldn't get fields", err);
                             deferred.reject("Couldn't load fields");
                        });

                        // console.log("dtaIlp::loadPlan() Assembled ilp: ", ilp);

                        return deferred.resolve(ilpCurrentPlan);
                    }, function(err) {
                        // no plan exists - make one!
                        console.log("no plan - creating", err);

                        // create the Plan
                        createPlanYear(_idStudent, _idYear)
                            .then(function(result) {
                                // console.log("posted ilp:", result);
                                ilpCurrentPlan = result;
                                ilpCurrentPlan.student = student;

                                getFields(ilpCurrentPlan.idPlan).then(function(fields) {
                                    ilpCurrentPlan.fields = fields;
                                    console.log("dtaIlp::LoadPlan got new plan fields", fields);

                                    calculateIlpInfo();

                                     deferred.resolve(ilpCurrentPlan);
                                }, function(err) {
                                    console.log("dtaIlp::LoadPlan() - couldn't get fields for new plan :(", err);
                                     deferred.reject("Couldn't load fields for new plan");
                                });

                            }, function(err) {
                                // TODO: Show an error here
                                console.log("dtaIlp::loadPlan()-createPlanYear failed to post ilp", err);
                                 deferred.reject("Cound not create plan " + err.statusText);
                            });
                    });

                }, function(err) {
                    // TODO: Show an error here

                    // Error occurred
                    console.log("no student. :(", err);

                     deferred.reject("Cound not find Student " + err.statusText);
                });

                // console.log("dtaIlp::loadPlan - returning deferred promise");
                return deferred.promise;
        }


        // 2016-04-14 8:38:44 (Pól): add field def records to fields!
        function calculateIlpInfo() {
            // go through each field 
           // console.log("dtaIlp::calculateIlpInfo() loading field definitions into Fields", ilpCurrentPlan.fields );
            for (var f=0; f<ilpCurrentPlan.fields.length;f++ ){

                // Add Field Definition information
                var _idFieldDef = ilpCurrentPlan.fields[f].idFieldDef;
                var found = $filter('filter')(ilpStructure.fieldDefinitions, 
                        { idFieldDef: _idFieldDef },
                        true);
               if (found && found.length) {
                    // console.log("dtaIlp::calculateIlpInfo() field definition idFieldDef: ", _idFieldDef, found);
                    ilpCurrentPlan.fields[f].fieldDefinition = found[0];
                } else {
                    // console.log("dtaIlp::calculateIlpInfo() no field definition for idFieldDef:", _idFieldDef);
                    // console.log("the questions", $scope.ilp.questions)
                }

                if (ilpCurrentPlan.fields[f].isHistorical === false) {
                    // console.log("dtaIlp::calculateIlpInfo() check history for idFieldDef: ", _idFieldDef, " ID:", ilpCurrentPlan.fields[f].idField);
                    var history = $filter('filter')(ilpCurrentPlan.fields, {isHistorical:true, idFieldDef: _idFieldDef}, true);
                    if (history && history.length) {
                        ilpCurrentPlan.fields[f].history = history;
                        // console.log("dtaIlp::calculateIlpInfo()  --- history:", history );
                    } else {
                        // console.log("dtaIlp::calculateIlpInfo()  --- no history");
                    }
                } else {
                   // console.log("dtaIlp::calculateIlpInfo() not checking history for historical idFieldDef: ", _idFieldDef, " ID:", ilpCurrentPlan.fields[f].idField);
                }

            }

            // console.log("dtaIlp::calculateIlpInfo() fields post work", ilpCurrentPlan.fields);


        }

        function getPlanYear(studentID, yearId) {

            // console.log("ILP.findONe idStudent : ", studentID, "Schoolyear: ", currentSchoolYearID);
            return IlpPlan.findOne({
                filter: {
                    where: {
                        idStudent: studentID,
                        idSchoolyear: yearId
                    }
                }
            }).$promise;
            // return plan;
        }


        function createPlanYear(studentID, yearID) {
            // // first create a plan
            // return IlpPlan.create(
            //     { idStudent: studentID, 
            //         idSchoolyear: yearID, 
            //         sUserid: AuthService.getUserId()})
            //     .$promise;
            // //that's it!

            var ilpData = {
                "idSchoolyear": yearID,
                "idStudent": studentID,
                "sUserid": AuthService.getUserId()
            };

            console.log("new ilp", ilpData);

            return IlpPlan
                .create(ilpData)
                .$promise;

        }

        function getStudent(studentID, yearID) {
            // console.log(" student.findOne: ", studentID, "Schoolyear: ", currentSchoolYearID);
            // return student;
            return VwClassStudentsWithIlp.findOne({
                filter: {
                    where: {
                        idStudent: studentID,
                        idSchoolyear: yearID
                    }
                }
            }).$promise;
        }

        // function getSections() {
        //     if (ilpStructure.sections) {
        //         // $q.when(myRefData);
        //         return $q.when(ilpStructure.sections);
        //     } else {
        //         return IlsSectionDef.find().$promise;
        //     }
        // }

        // function getQuestions() {
        //     if (ilpStructure.questions) {
        //         // console.log("dtaIlp.getQuestions - loading local copy");
        //         return $q.when(ilpStructure.questions);
        //     } else {
        //         var deferred = $q.defer();

        //         IlsFieldQuestions.find().$promise
        //             .then(function(questions) {
        //                 ilpStructure.questions = questions;
        //                 console.log("downloaded questions in dtaIlp.getQuestions(): ", questions);
        //                 deferred.resolve(ilpStructure.questions);
        //             }, function(err) {
        //                 //TODO: process error
        //                 console.log("No questions. :(");
        //                 deferred.reject(err);

        //             });

        //         return deferred.promise;
        //     }
        // }

        // function getQuestionforFieldDefId(_idFieldDef) {
        //     var qList = [];
        //     // console.log("fetching questions for idFieldDef: ", _idFieldDef);
        //     if (_idFieldDef && ilpStructure.questions) {
        //         // console.log("we have questions: ", ilpQuestions);

        //         for (var i = 0; i < ilpStructure.questions.length; i++) {
        //             if (ilpStructure.questions[i].idFieldDef === _idFieldDef) {
        //                 qList.push(ilpStructure.questions[i].questionText);
        //             }

        //         }

        //         // console.log("questions: ", qList);
        //         // return qList;


        //     } else {
        //         console.log("failed fetching questions for id: ", _idFieldDef);
        //     }

        //     if (qList.length > 0) {
        //         return qList; }
        //     return null;
        // }

        function getFields(_idPlan) {

            // console.log("dtaIlp::getFields getting fields for ilp_plan.idPlan: ", _idPlan);
            return VwIlpFields.find({
                filter: {
                    where: {idPlan: _idPlan},
                    order: "idSectionDef, groupOrder, displayOrder"
                }
            }).$promise;

        }

        // 2015-12-10 7:06:06 (Pól): given a vwilpfields object, let's do an update on the field itself, then slag the data back in.
        function updateFieldItem(theField) {
            var userID = AuthService.getUserId();
            // return theField.$save();

            console.log("dtaIlp::updateFieldItem(theField::", theField, " by: ", userID);
            return IlpField.update(
                { where: { idField: theField.idField } }, 
                {
                contents: theField.contents,
                sUser: userID
                }
            ).$promise;
        }

        function updateField(fieldId, fieldContent) {
            var userID = AuthService.getUserId();

            return IlpField.updateAll({
                idField: fieldId
            }, {
                contents: fieldContent,
                sUser: userID
            });

        }

        function planDone(_idPlan) {
            var userID = AuthService.getUserId();
            // console.log("dtaIlp::planDone() Updateing Plan ", _idPlan, " for User ", userID);

            return IlpPlan.update(
                { where: {idPlan : _idPlan } },
                {intakeDone: true,
                    sUser: userID}
            ).$promise;
        }
    }

})();
