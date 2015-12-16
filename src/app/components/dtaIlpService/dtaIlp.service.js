(function() {
    'use strict';

    angular
        .module('ilpBase')
        .service('dtaIlp', dtaIlp);

    /** @ngInject */
    function dtaIlp($log, Ilp, VwClassStudentsWithIlp, IlsSectionDef, VwIlpFields, IlpField, AuthService ) {
        var console = $log;

        var currentSchoolYear = "2015/2016";
        var currentSchoolYearID = 1;

        var ilpSections;
        // var ilpFieldDefs;

        IlsSectionDef.find(
            // { filter: { where: {idStudent : studentID,
            //   idSchoolyear : currentSchoolYearID  }}}
        ).$promise
        .then(function(result) {
            ilpSections = result;
            // console.log("Grabbed the list of ilpSections : ", result);
        }, function(err) {
            // Error occurred
            //TODO: Process error
            console.log("no class :(", err);
        });

  
        // console.log("dtaIlp plan", plan);
        this.createPlan = createPlan;
        this.createPlanYear = createPlanYear;
        this.getPlan = getPlan;
        this.getStudent = getStudent;
        this.getFields = getFields;
        this.getSchoolYear = getSchoolYear;
        this.getSections = getSections;

        this.updateFieldItem = updateFieldItem;
        this.updateField = updateField;

        // get the ILP for a student in the current school year
        function getPlan(studentID) {

            // console.log("ILP.findONe idStudent : ", studentID, "Schoolyear: ", currentSchoolYearID);
            return Ilp.findOne(
                { filter: { where: {idStudent : studentID,
                  idSchoolyear : currentSchoolYearID  }}}
            ).$promise;
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

            var ilpData = {"idSchoolyear" : yearID, 
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
            return VwClassStudentsWithIlp.findOne(
                { filter: { where: {idStudent : studentID,
                  idSchoolyear : currentSchoolYearID  }}}
            ).$promise;
        }

        function getSections()
        {
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
            return VwIlpFields.find(
                {filter: {where: {idIlp: ilpID}} }
                ).$promise;
                
        }

        function getSchoolYear() {
            return currentSchoolYear;
        }


        // 2015-12-10 7:06:06 (Pól): given a vwilpfields object, let's do an update on the field itself, then slag the data back in.
        function updateFieldItem(theField) {
            // return theField.$save();

            return IlpField.update(
                { where: {idStudent : theField.idStudent,
                    idField: theField.idField  }},
                {
                    contents: theField.contents, 
                    sUserid: AuthService.getUserId()}
            ).$promise;
        }

        function updateField(fieldId, fieldContent) {
            var userID = AuthService.getUserId();

            return IlpField.updateAll(
              { idField : fieldId },
                {contents : fieldContent, sIdUser : userID}
                );
        
        }
    }

})();
