(function() {
    'use strict';

    angular
        .module('ilpBase')
        .service('dtaClass', dtaClass);
 
    /** @ngInject */
    function dtaClass($log, IlpClass, VwClassStudentsWithIlp, VwClassTeachers, AuthService) {
        var console = $log;

        var studentList;
        var currentClassListId;
        // var teacherId;


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
            if (classId !== currentClassListId){
                // clear the cache
                currentClassListId = classId;
                studentList = {};
            }

            return VwClassStudentsWithIlp.find(
                { filter: { where: { idClass: parseInt(classId) } } }
                ).$promise;

        }

    }

})();
