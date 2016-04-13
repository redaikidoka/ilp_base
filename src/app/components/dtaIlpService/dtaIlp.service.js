(function() {
    'use strict';

    angular
        .module('ilpBase')
        .service('dtaIlp', dtaIlp);

    /** @ngInject */
    function dtaIlp($log, $q, IlpPlan, VwClassStudentsWithIlp, IlsSectionDef, VwIlpFields, IlpField, AuthService, IlsFieldQuestions, IlsFieldGroup) {
        var console = $log;

        // var currentSchoolYearID = 0;

        var ilp = {};
        ilp.structure = {};
        // console.log("dtaIlp :: loading");
        loadStructure();


        this.loadPlan = loadPlan;
        // this.loadStructure = loadStructure();

        // 
        // Exposed Functions
        //
        this.getIlpStructure = getIlpStructure;

        // this.createPlan = createPlan;
        this.createPlanforYear = createPlanYear;
        // this.getPlan = getPlan;
        this.getPlanbyStudentYear = getPlanYear;
        this.getStudent = getStudent;
        this.getFields = getFields;
        this.getSections = getSections;
        this.getQuestions = getQuestions;
        this.getQuestionforFieldDefId = getQuestionforFieldDefId;

        this.updateFieldItem = updateFieldItem;
        this.updateField = updateField;


        // ilp{}
        //  .plan{}
        //      .fields[]
        //      .student{}

        //  .structure{}
        //      .sections[]
        //      .questions[]
        //      .groups[]

        // heands the structure to the outside
        function getIlpStructure() {
            if (ilp.structure) {
                return ilp.structure;
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
                    ilp.structure.sections = result;
                    // console.log("dtaIlp::loadStructure downloaded ILP Sections : ", ilp.structure.sections);
                }, function(err) {
                    // Error occurred
                    //TODO: Process error
                    console.log("dtaIlp::loadStructure no sections in dtaILP :(", err);
                });

            IlsFieldQuestions.find().$promise
                .then(function(questions) {
                    ilp.structure.questions = questions;
                    // console.log("dtaIlp::loadStructure downloaded ILP Questions ", ilp.structure.questions);
                }, function(err) {
                    //TODO: process error
                    console.log("dtaIlp::loadStructure No questions. :(", err);

                });

            IlsFieldGroup.find().$promise
                .then(function(groups) {
                    ilp.structure.groups = groups;
                    // console.log("dtaIlp::loadStructure downloaded ILP Groups", ilp.structure.groups);
                }, function(err) {
                    //TODO: PROCESS ERROR
                    console.error("dtaIlp::loadStructure no groups for the ILP!", err);
                });
        }

        function loadPlan(_idStudent, _idYear) {
            // RETURNS a promise for an ilp object
            //  .plan{} =>  
            //      .fields[]
            //      .student {}

            var deferred = $q.defer();

            if (!_idStudent || !_idYear) {
                ilp = null;
                console.log("dtaIlp.loadPlan:: _idStudent", _idStudent, "_idYear", _idYear);
                return deferred.reject("missing parameter");

            }

            // check to see if we have it already
            if (ilp && ilp.plan && ilp.student) {
                if (ilp.plan.idStudent === _idStudent &&
                    ilp.plan.idSchoolYear === _idYear &&
                    ilp.plan.student.idStudent === _idStudent) {
                     deferred.resolve(ilp.plan);
                }
            }

            // clean up
            ilp.plan = {};

            // load the student
            getStudent(_idStudent)
                .then(function(student) {
                    // console.log("ilp:Got a student!", results);
                    ilp.student = student;

                    // load the ilp record
                    getPlanYear(_idStudent, _idYear).then(function(plan) {
                        ilp.plan = plan;
                        ilp.plan.student = student;

                        getFields(ilp.plan.idPlan).then(function(fields) {
                            ilp.plan.fields = fields;
                            // console.log("dtaIlp::LoadPlan got fields", fields);

                            // calculateIlpInfo();

                             deferred.resolve(ilp.plan);
                        }, function(err) {
                            console.log("dtaIlp::LoadPlan() - couldn't get fields", err);
                             deferred.reject("Couldn't load fields");
                        });

                        // console.log("dtaIlp::loadPlan() Assembled ilp: ", ilp);

                        return deferred.resolve(ilp.plan);
                    }, function(err) {
                        // no plan exists - make one!
                        console.log("no plan - creating", err);

                        // create the Plan
                        createPlanYear(_idStudent, _idYear)
                            .then(function(result) {
                                // console.log("posted ilp:", result);
                                ilp.plan = result;
                                ilp.plan.student = student;

                                getFields(ilp.plan.idPlan).then(function(fields) {
                                    ilp.plan.fields = fields;
                                    console.log("dtaIlp::LoadPlan got new plan fields", fields);

                                    // calculateIlpInfo();

                                     deferred.resolve(ilp.plan);
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

        // function createPlan(studentId) {
        //     // create a plan in the current year
        //     return createPlanYear(studentId, currentSchoolYearID);
        // }

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

        function getSections() {
            if (ilp.structure.sections) {
                // $q.when(myRefData);
                return $q.when(ilp.structure.sections);
            } else {
                return IlsSectionDef.find().$promise;
            }
        }

        function getQuestions() {
            if (ilp.structure.questions) {
                // console.log("dtaIlp.getQuestions - loading local copy");
                return $q.when(ilp.structure.questions);
            } else {
                var deferred = $q.defer();

                IlsFieldQuestions.find().$promise
                    .then(function(questions) {
                        ilp.structure.questions = questions;
                        console.log("downloaded questions in dtaIlp.getQuestions(): ", questions);
                        deferred.resolve(ilp.structure.questions);
                    }, function(err) {
                        //TODO: process error
                        console.log("No questions. :(");
                        deferred.reject(err);

                    });

                return deferred.promise;
            }
        }

        function getQuestionforFieldDefId(_idFieldDef) {
            var qList = [];
            // console.log("fetching questions for idFieldDef: ", _idFieldDef);
            if (_idFieldDef && ilp.structure.questions) {
                // console.log("we have questions: ", ilpQuestions);

                for (var i = 0; i < ilp.structure.questions.length; i++) {
                    if (ilp.structure.questions[i].idFieldDef === _idFieldDef) {
                        qList.push(ilp.structure.questions[i].questionText);
                    }

                }

                // console.log("questions: ", qList);
                // return qList;


            } else {
                console.log("failed fetching questions for id: ", _idFieldDef);
            }

            if (qList.length > 0) {
                return qList; }
            return null;
        }

        function getFields(planID) {

            // console.log("dtaIlp::getFields getting fields for ilp_plan.idPlan: ", planID);
            return VwIlpFields.find({
                filter: {
                    where: {
                        idPlan: planID
                    }
                }
            }).$promise;

        }

        // 2015-12-10 7:06:06 (Pól): given a vwilpfields object, let's do an update on the field itself, then slag the data back in.
        function updateFieldItem(theField) {
            var userID = AuthService.getUserId();
            // return theField.$save();

            console.log("dtaIlp::updateFieldItem(theField::", theField, " by: ", userID);
            return IlpField.update({
                where: {
                    idField: theField.idField
                }
            }, {
                contents: theField.contents,
                sUser: userID
            }).$promise;
        }

        function updateField(fieldId, fieldContent) {
            var userID = AuthService.getUserId();

            return IlpField.updateAll({
                idField: fieldId
            }, {
                contents: fieldContent,
                sIdUser: userID
            });

        }
    }

})();
