(function() {
    'use strict';

    angular
        .module('ilpBase')
        .service('dtaClass', dtaClass);
 
    /** @ngInject */
    function dtaClass(IlpClass, VwClassStudentsWithIlp) {
        var currentSchoolYear = "2015/2016";

        // var classList = [{
        //     "idClass": 1,
        //     "name": "Potions K",
        //     "description": "A really great introduction to blowing things up",
        //     "schoolyearId": 1,
        //     "grade": 0
        // }, {
        //     "idClass": 2,
        //     "name": "Charms",
        //     "description": "How to make cool things happen",
        //     "schoolyearId": 1,
        //     "grade": 1
        // }];

        var classListRemote = null;

        IlpClass.find().$promise
        .then(function(results) {
          classListRemote = results;
          console.log("initial classlist from server", classListRemote);
        });


        this.getClassList = getClassList;
        this.getClass = getClass;
        this.getStudentList = getStudentList;
        this.getSchoolYear = getSchoolYear;

        function getClassList() {

            return IlpClass.find().$promise;
        }

        function getClass(idClass) {
            
            return IlpClass.findById({ id: idClass}).$promise;
         }

        function getStudentList(classId) {

            // if (parseInt(classId) === 1)
            //     {return studentList1;}
            // else 
            // 	{return studentList2;}

            classId = parseInt(classId);

            return VwClassStudentsWithIlp.find(
                { filter: { where: { idClass: classId } } }
                ).$promise;

        
        }

        function getSchoolYear() {
        	return currentSchoolYear;
        }
    }

})();
