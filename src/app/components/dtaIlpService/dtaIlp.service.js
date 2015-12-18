(function() {
        'use strict';

        angular
            .module('ilpBase')
            .service('dtaIlp', dtaIlp);

        /** @ngInject */
        function dtaIlp($log, Ilp, VwClassStudentsWithIlp, IlsSectionDef, VwIlpFields, IlpField, AuthService) {
            var console = $log;

            var currentSchoolYear = "2015/2016";
            var currentSchoolYearID = 1;

            var ilpSections;
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
            this.getStudent = getStudent;
            this.getFields = getFields;
            this.getSchoolYear = getSchoolYear;
            this.getSections = getSections;

            this.updateFieldItem = updateFieldItem;
            this.updateField = updateField;

            function loadPlan(studentId, yearId) {

                if (!studentId || !yearId) {
                    ilp = null;
                    return false;

                }


                // load the student
                // check to see if we have it already
                if (ilp && ilp.student) {
                    if (ilp.idStudent === studentId &&
                        ilp.idSchoolYear === yearId &&
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
                        dtaIlp.getPlan(studentId).then(function(results) {
                            ilp.plan = results;

                            loadFields(ilp.plan.idIlp);
                        }, function(err) {
                            // Error occurred

                            console.log("no plan - creating", err);

                            // create the Plan
                            dtaIlp.createPlanYear(studentId, yearId)
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

                        // sections
                        ilp.plan.sections = ilpSections;

                        console.log("Assembled ilp: ", ilp);

                        return ilp;
                    }, function(err) {
                        // TODO: Show an error here

                        // Error occurred
                        console.log("no student. :(", err);

                        return err;
                    });

                }

                function loadFields(idILP) {
                    // console.log("loading fields");

                    dtaIlp.getFields(idILP).then(function(fields) {
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

                function getStudent(studentID) {
                    // console.log(" student.findOne: ", studentID, "Schoolyear: ", currentSchoolYearID);
                    // return student;
                    return VwClassStudentsWithIlp.findOne({
                        filter: {
                            where: {
                                idStudent: studentID,
                                idSchoolyear: currentSchoolYearID
                            }
                        }
                    }).$promise;
                }

                function getSections() {
                    // if (ilpSections) {
                    //     //TODO: make a promise
                    //     return ilpSections;
                    // }
                    // else {
                    return IlsSectionDef.find().$promise;
                    // }
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

                function getSchoolYear() {
                    return currentSchoolYear;
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
