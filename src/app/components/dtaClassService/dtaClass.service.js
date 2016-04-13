(function() {
    'use strict';

    angular
        .module('ilpBase')
        .service('dtaClass', dtaClass);
 
    /** @ngInject */
    function dtaClass($log, IlpClass, IlpClassStudent, VwClassStudentsWithIlp, VwClassTeachers, VwStudents, AuthService) {
        var console = $log;

        // var currentSchoolYearId;
        var studentList;
        var currentClassListId;
        // var teacherId;

        // var fullStudentList = null;

        this.getClassList = getClassList;
        this.getClass = getClass;
        this.getStudentList = getStudentList;
        this.getFullStudentList = getFullStudentList;
        this.addClassStudent = addClassStudent;
        this.getYearStudentList = getYearStudentList;
        this.updateClassDescription = updateClassDescription;

        /* returns a list of classes for the current user */
        function getClassList(yearId) {
            var teacherID = AuthService.getUserId();
            // console.log("dtaClass::TeacherID: ", teacherID);

            if (AuthService.isAdmin()) {
                // console.log("getting all classes");
                return IlpClass.find(   { idSchoolyear: yearId } 
                    ).$promise;

            } else {
                // console.log("getting teacher classes");
                return VwClassTeachers.find(
                    { filter:  { where:  { idTeacher: teacherID, idSchoolyear: yearId } } }
                    ).$promise;
            }
            
        }

        function getClass(idClass) {
            
            return IlpClass.findById( { id: idClass} ).$promise;
         }

        function getStudentList(_idClass) {
            if (_idClass !== currentClassListId){
                // clear the cache
                currentClassListId = _idClass;
                studentList = {};
            }

            // console.log("dtaClass::getStudentList loading students for class: ", _idClass);

            return VwClassStudentsWithIlp.find(
                { filter: { where: { idClass: parseInt(_idClass) } } }
                ).$promise;

        }

        function getFullStudentList(_idSchoolYear, _grade) {

            // if (fullStudentList) { 
            //     console.log("got it!");
            //     return $q.when(fullStudentList);
            // }

            return VwClassStudentsWithIlp.find( {idSchoolYear: _idSchoolYear, grade: _grade}).$promise;

        }

        function getYearStudentList(_idSchoolYear) {
            return VwStudents.find( {idSchoolYear: _idSchoolYear}).$promise;

        }

        function addClassStudent(_idClass, _idStudent)
        {
            var classStudentData = {
                "idClass": _idClass,
                "idStudent": _idStudent
            };

            console.log("new classstudent", classStudentData);

            return IlpClassStudent
                .create(classStudentData)
                .$promise;

        }

        function updateClassDescription(_idClass, _description) {
            // console.log("updating class description: ", _idClass, _description);
            return IlpClass.update( {  where: {  idClass: _idClass } }, 
            {
                description: _description,
                sUserid: AuthService.getUserId()
            }).$promise;

        }

    }

})();
