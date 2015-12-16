(function() {
    'use strict';

    angular
        .module('ilpBase')
        .service('dtaClass', dtaClass);
 
    /** @ngInject */
    function dtaClass($log, IlpClass, VwClassStudentsWithIlp, VwClassTeachers, AuthService) {
        var currentSchoolYear = "2015/2016";

        var console = $log;

        // var classListRemote = null;

        // IlpClass.find().$promise
        // .then(function(results) {
        //   classListRemote = results;
        //   console.log("Got all IlpClass from Server for caching:", classListRemote);
        // });


        this.getClassList = getClassList;
        this.getClass = getClass;
        this.getStudentList = getStudentList;
        this.getSchoolYear = getSchoolYear;

        /* returns a list of classes for the current user */
        function getClassList() {
            var teacherID = AuthService.getUserId();
            console.log("TeacherID: ", teacherID);

            return VwClassTeachers.find(
                { filter: { where: { idTeacher: teacherID } } }
                ).$promise;
            //return IlpClass.find({ filter: { where: {idTeacher: AuthService.getUserId()}}}).$promise;
        }

        function getClass(idClass) {
            
            return IlpClass.findById( { id: idClass} ).$promise;
         }

        function getStudentList(classId) {

            return VwClassStudentsWithIlp.find(
                { filter: { where: { idClass: parseInt(classId) } } }
                ).$promise;

        }

        function getSchoolYear() {
        	return currentSchoolYear;
        }
    }

})();
