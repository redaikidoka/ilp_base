(function() {
    'use strict';

    angular
        .module('ilpBase')
        .service('dtaClass', dtaClass);

    /** @ngInject */
    function dtaClass($filter) {
        var currentSchoolYear = "2015/2016";

        var classList = [{
            "idClass": 1,
            "name": "Potions K",
            "description": "A really great introduction to blowing things up",
            "schoolyearId": 1,
            "grade": 0
        }, {
            "idClass": 2,
            "name": "Charms",
            "description": "How to make cool things happen",
            "schoolyearId": 1,
            "grade": 1
        }];

        var studentList1 = [{
            "absences": 0,
            "age": 4,
            "cohort": "Ravenclaw",
            "dob": "2010-11-13T00:00:00.000Z",
            "grade": 0,
            "hasIlp": null,
            "idClass": 2,
            "idClassstudentLink": 16,
            "idSchoolyear": 1,
            "idStudent": 16,
            "name": "Trevor Boot",
            "nameFirst": "Trevor",
            "nameLast": "Boot",
            "profilepicture": "16_b.png",
            "studentid": "29135540"
        }, {
            "absences": 0,
            "age": 5,
            "cohort": "Slytherin",
            "dob": "2010-04-02T00:00:00.000Z",
            "grade": 0,
            "hasIlp": true,
            "idClass": 2,
            "idClassstudentLink": 17,
            "idSchoolyear": 1,
            "idStudent": 17,
            "name": "Millicent Bulstrode",
            "nameFirst": "Millicent",
            "nameLast": "Bulstrode",
            "profilepicture": "17_b.png",
            "studentid": "31703501"
        }, {
            "absences": 0,
            "age": 5,
            "cohort": "Gryffindor",
            "dob": "2010-08-31T00:00:00.000Z",
            "grade": 0,
            "hasIlp": null,
            "idClass": 2,
            "idClassstudentLink": 18,
            "idSchoolyear": 1,
            "idStudent": 18,
            "name": "Neville Longbottom",
            "nameFirst": "Neville",
            "nameLast": "Longbottom",
            "profilepicture": "18_b.png",
            "studentid": "31716357"
        }, {
            "absences": 0,
            "age": 4,
            "cohort": "Ravenclaw",
            "dob": "2010-11-19T00:00:00.000Z",
            "grade": 0,
            "hasIlp": null,
            "idClass": 2,
            "idClassstudentLink": 19,
            "idSchoolyear": 1,
            "idStudent": 19,
            "name": "Tracey Davis",
            "nameFirst": "Tracey",
            "nameLast": "Davis",
            "profilepicture": "19_b.png",
            "studentid": "33593925"
        }, {
            "absences": 0,
            "age": 4,
            "cohort": "Ravenclaw",
            "dob": "2010-09-23T00:00:00.000Z",
            "grade": 0,
            "hasIlp": null,
            "idClass": 2,
            "idClassstudentLink": 20,
            "idSchoolyear": 1,
            "idStudent": 20,
            "name": "Luna Lovegood",
            "nameFirst": "Luna",
            "nameLast": "Lovegood",
            "profilepicture": "20_b.png",
            "studentid": "34105657"
        },  {
            "absences": 0,
            "age": 5,
            "cohort": "Ravenclaw",
            "dob": "2010-08-18T00:00:00.000Z",
            "grade": 0,
            "hasIlp": null,
            "idClass": 1,
            "idClassstudentLink": 50,
            "idSchoolyear": 1,
            "idStudent": 34,
            "name": "Michael Corner",
            "nameFirst": "Michael",
            "nameLast": "Corner",
            "profilepicture": "34_b.png",
            "studentid": "70554723"
        }, {
            "absences": 0,
            "age": 4,
            "cohort": "Gryffindor",
            "dob": "2010-11-18T00:00:00.000Z",
            "grade": 0,
            "hasIlp": null,
            "idClass": 1,
            "idClassstudentLink": 51,
            "idSchoolyear": 1,
            "idStudent": 35,
            "name": "Ronald Weasley",
            "nameFirst": "Ronald",
            "nameLast": "Weasley",
            "profilepicture": "35_b.png",
            "studentid": "80929783"
        }, {
            "absences": 0,
            "age": 4,
            "cohort": "Hufflepuff",
            "dob": "2010-10-31T00:00:00.000Z",
            "grade": 0,
            "hasIlp": null,
            "idClass": 1,
            "idClassstudentLink": 52,
            "idSchoolyear": 1,
            "idStudent": 36,
            "name": "Susan Bones",
            "nameFirst": "Susan",
            "nameLast": "Bones",
            "profilepicture": "36_b.png",
            "studentid": "83169891"
        }, {
            "absences": 0,
            "age": 5,
            "cohort": "Hufflepuff",
            "dob": "2010-07-23T00:00:00.000Z",
            "grade": 0,
            "hasIlp": null,
            "idClass": 1,
            "idClassstudentLink": 53,
            "idSchoolyear": 1,
            "idStudent": 37,
            "name": "Isobel MacDougal",
            "nameFirst": "Isobel",
            "nameLast": "MacDougal",
            "profilepicture": "37_b.png",
            "studentid": "84471424"
        }, {
            "absences": 0,
            "age": 4,
            "cohort": "Gryffindor",
            "dob": "2010-10-31T00:00:00.000Z",
            "grade": 0,
            "hasIlp": null,
            "idClass": 1,
            "idClassstudentLink": 54,
            "idSchoolyear": 1,
            "idStudent": 38,
            "name": "Mati Patel",
            "nameFirst": "Mati",
            "nameLast": "Patel",
            "profilepicture": "38_b.png",
            "studentid": "94025816"
        }, {
            "absences": 0,
            "age": 4,
            "cohort": "Hufflepuff",
            "dob": "2010-10-17T00:00:00.000Z",
            "grade": 0,
            "hasIlp": null,
            "idClass": 1,
            "idClassstudentLink": 55,
            "idSchoolyear": 1,
            "idStudent": 39,
            "name": "Ernest Macmillan",
            "nameFirst": "Ernest",
            "nameLast": "Macmillan",
            "profilepicture": "39_b.png",
            "studentid": "98185277"
        }];

        var studentList2 = [{
            "absences": 0,
            "age": 5,
            "cohort": "Slytherin",
            "dob": "2010-04-22T00:00:00.000Z",
            "grade": 0,
            "hasIlp": null,
            "idClass": 2,
            "idClassstudentLink": 15,
            "idSchoolyear": 1,
            "idStudent": 15,
            "name": "Theodore Nott",
            "nameFirst": "Theodore",
            "nameLast": "Nott",
            "profilepicture": "15_b.png",
            "studentid": "21963795"
        }, {
            "absences": 0,
            "age": 4,
            "cohort": "Ravenclaw",
            "dob": "2010-11-13T00:00:00.000Z",
            "grade": 0,
            "hasIlp": null,
            "idClass": 2,
            "idClassstudentLink": 16,
            "idSchoolyear": 1,
            "idStudent": 16,
            "name": "Trevor Boot",
            "nameFirst": "Trevor",
            "nameLast": "Boot",
            "profilepicture": "16_b.png",
            "studentid": "29135540"
        }, {
            "absences": 0,
            "age": 5,
            "cohort": "Slytherin",
            "dob": "2010-04-02T00:00:00.000Z",
            "grade": 0,
            "hasIlp": true,
            "idClass": 2,
            "idClassstudentLink": 17,
            "idSchoolyear": 1,
            "idStudent": 17,
            "name": "Millicent Bulstrode",
            "nameFirst": "Millicent",
            "nameLast": "Bulstrode",
            "profilepicture": "17_b.png",
            "studentid": "31703501"
        }];

        this.getClassList = getClassList;
        this.getClass = getClass;
        this.getStudentList = getStudentList;
        this.getSchoolYear = getSchoolYear;

        function getClassList() {
            return classList;
        }

        function getClass(idClass) {
        	var clss = getClassList();
       		console.log('getclass(' + idClass + ')', " classes:", clss);
       		var thisClass = {};

       		for (var i = 0; i < clss.length; i++)
       		{
       			if (clss[i].idClass == idClass)
       			{
       				thisClass = clss[i];
       				console.log("found: ", thisClass);
       				break;
       			}
       		}

       		// var thisClass = $filter('filter')( clss, {classId: idClass}, true)[0];
       		// console.log('getClass found:', thisClass);
       		// thisClass = $filter('filter')( clss, {name: "Potions"}, false)[0];
       		console.log('getClass found:', thisClass);

       		return thisClass;
        }

        function getStudentList(classId) {
            if (parseInt(classId) === 1)
                {return studentList1;}
            else 
            	{return studentList2;}
        }

        function getSchoolYear() {
        	return currentSchoolYear;
        }
    }

})();
