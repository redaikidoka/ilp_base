(function() {
        'use strict';

        angular
            .module('ilpBase')
            .service('dtaIlp', dtaIlp);

        /** @ngInject */
        function dtaIlp($log, $q, Ilp, VwClassStudentsWithIlp, IlsSectionDef, VwIlpFields, IlpField, AuthService) {
            var console = $log;

            // var currentSchoolYear = "2015/2016";
            // TODO: LOAD 
            var currentSchoolYearID = 0;

            var ilpSections;
            // var ilpSectionFetchPromise;
            var ilp;

            // var ilpFieldDefs;

            // we can just hang onto these - they don't change.
            IlsSectionDef.find().$promise
                .then(function(result) {
                    ilpSections = result;
                    // console.log("Grabbed the list of ilpSections : ", result);
                }, function(err) {
                    // Error occurred
                    //TODO: Process error
                    console.log("no class :(", err);
                });

            this.loadPlan = loadPlan;

            this.createPlan = createPlan;
            this.createPlanYear = createPlanYear;
            this.getPlan = getPlan;
            this.getPlanYear = getPlanYear;
            this.getStudent = getStudent;
            this.getFields = getFields;
            this.getSections = getSections;

            this.updateFieldItem = updateFieldItem;
            this.updateField = updateField;

            function loadPlan(studentId, yearId) {
                // RETURNS AN ILP OBJECT
                // ilp.student {}
                // ilp.plan {}
                // ilp.plan.sections
                // ilp.plan.fields

                if (!studentId || !yearId) {
                    ilp = null;
                    return false;

                }

                // load the student
                // check to see if we have it already
                if (ilp && ilp.plan && ilp.student) {
                    if (ilp.plan.idStudent === studentId &&
                        ilp.plan.idSchoolYear === yearId &&
                        ilp.student.idStudent === studentId) {
                        return ilp;
                    }
                }

                // clean up
                ilp = {};

                getStudent(studentId)
                    .then(function(results) {
                        // console.log("ilp:Got a student!", results);
                        ilp.student = results;

                        // load the ilp record
                        getPlan(studentId).then(function(results) {
                            ilp.plan = results;

                            loadFields(ilp.plan.idIlp);
                           // sections
                            ilp.plan.sections = ilpSections;

                            console.log("Assembled ilp: ", ilp);

                            return ilp;
                        }, function(err) {
                            // Error occurred

                            console.log("no plan - creating", err);

                            // create the Plan
                            createPlanYear(studentId, yearId)
                                .then(function(result) {
                                    // console.log("posted ilp:", result);
                                    ilp.plan = result;
                                    loadFields(ilp.plan.idIlp);
                                    // $state.go('ilp', {idStudent: vm.idStudent, idClass: classID});
                                }, function(err) {
                                    // TODO: Show an error here
                                    console.log("failed to post ilp", err);
                                    return err;
                                });
                        });

                     }, function(err) {
                        // TODO: Show an error here

                        // Error occurred
                        console.log("no student. :(", err);

                        return err;
                    });

                }

                function loadFields(idILP) {
        
                    getFields(idILP).then(function(fields) {
                        ilp.plan.fields = fields;
                        console.log("dtaIlp: Loading fields", fields);
                    });

                }


                // get the ILP for a student in the current school year
                function getPlan(studentID) {

                    // console.log("ILP.findONe idStudent : ", studentID, "Schoolyear: ", currentSchoolYearID);
                    return Ilp.findOne({
                        filter: {
                            where: {
                                idStudent: studentID,
                                idSchoolyear: currentSchoolYearID
                            }
                        }
                    }).$promise;
                    // return plan;
                }

               function getPlanYear(studentID, yearId) {

                    // console.log("ILP.findONe idStudent : ", studentID, "Schoolyear: ", currentSchoolYearID);
                    return Ilp.findOne({
                        filter: {
                            where: {
                                idStudent: studentID,
                                idSchoolyear: yearId
                            }
                        }
                    }).$promise;
                    // return plan;
                }

                function createPlan(studentId) {
                    // create a plan in the current year
                    return createPlanYear(studentId, currentSchoolYearID);
                }

                function createPlanYear(studentID, yearID) {
                    // // first create a plan
                    // return Ilp.create(
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

                    return Ilp
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
                    if (ilpSections) {
                        // $q.when(myRefData);
                        return $q.when(ilpSections);
                    }
                    else {
                        return IlsSectionDef.find().$promise;
                    }
                }

                function getFields(ilpID) {

                    // TODO: console.log("getting page", pagenum);
                    // return plan.pages[pagenum].fields;
                    return VwIlpFields.find({
                        filter: {
                            where: {
                                idIlp: ilpID
                            }
                        }
                    }).$promise;

                }

                // 2015-12-10 7:06:06 (Pól): given a vwilpfields object, let's do an update on the field itself, then slag the data back in.
                function updateFieldItem(theField) {
                    // return theField.$save();

                    return IlpField.update({
                        where: {
                            idStudent: theField.idStudent,
                            idField: theField.idField
                        }
                    }, {
                        contents: theField.contents,
                        sUserid: AuthService.getUserId()
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
