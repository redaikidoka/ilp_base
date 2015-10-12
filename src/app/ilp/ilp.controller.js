(function() {
    'use strict';

    angular
        .module('ilpBase')
        .controller('IlpController', IlpController);

    /** @ngInject */
    function IlpController($scope, $log) {
        var vm = this;
        var console = $log;
        vm.lastUpdated = new Date();

        //$log.debug("Here we are in the ilp!");

        $scope.getHeaderColor = function(fld) {
            //console.log(fld);

            if (!fld.contents) {
                return 'hilite';
            }
            return '';
        };

        vm.plan = {
            "idIlp": 1,
            "idSchoolyear": 1,
            "idStudent": 17,
            "sUpdate": "2015-09-01T10:56:04.000Z",
            "sCreate": null,
            "pages": []
        };

        vm.user = {
            "idTeacher": 13,
            "name": "Filius Flitwick",
            "nameFirst": "Filius ",
            "nameLast": "Flitwick",
            "teacherId": "145860408",
            "cohort": "",
            profilePicture: "assets/images/flitwick.jpeg"
        };

        vm.student = {
            "absences": 0,
            "age": 5,
            "cohort": "Gryffindor",
            "dob": "2010-07-01T00:00:00.000Z",
            "grade": 0,
            "hasIlp": null,
            "idClass": 2,
            "idClassstudentLink": 23,
            "idSchoolyear": 1,
            "idStudent": 23,
            "name": "Harry Potter",
            "nameFirst": "Harry",
            "nameLast": "Potter",
            "profilepicture": "23_b.png",
            "fullpicture": "hp1.jpg",
            "studentid": "44117232"
        };

        vm.plan.pages = [{
            "idSectionDef": 1,
            "name": "Summary",
            "description": "Used for Intakes and Updates",
            "title": "Summary",
            "order": 10,
            "idSectionType": null,
            "sectionType": "F"
        }, {
            "idSectionDef": 2,
            "name": "Arc 1",
            "description": null,
            "title": "Arc 1",
            "order": 20,
            "idSectionType": null,
            "sectionType": "A"
        }, {
            "idSectionDef": 3,
            "name": "Arc 2",
            "description": null,
            "title": "Arc 2",
            "order": 30,
            "idSectionType": null,
            "sectionType": "A"
        }, {
            "idSectionDef": 4,
            "name": "Arc 3",
            "description": null,
            "title": "Arc 3",
            "order": 40,
            "idSectionType": null,
            "sectionType": "A"
        }, {
            "idSectionDef": 5,
            "name": "SEL",
            "description": null,
            "title": "SEL",
            "order": 50,
            "idSectionType": null,
            "sectionType": "F"
        }, {
            "idSectionDef": 6,
            "name": "Art",
            "description": null,
            "title": "Art",
            "order": 60,
            "idSectionType": null,
            "sectionType": "F"
        }, {
            "idSectionDef": 7,
            "name": "Spanish",
            "description": null,
            "title": "Spanish",
            "order": 70,
            "idSectionType": null,
            "sectionType": "?"
        }, {
            "idSectionDef": 8,
            "name": "Feed",
            "description": null,
            "title": "Feed",
            "order": 80,
            "idSectionType": null,
            "sectionType": "D"
        }];
        
        vm.plan.pages[0].layoutColumns = [10, 20];

        vm.plan.pages[0].fields = [{
            "sectionName": "Summary",
            "sectionDescription": "Used for Intakes and Updates",
            "sectionTitle": "Summary",
            "idSectionDef": 1,
            "idFieldDef": 1,
            "name": "Meeting Notes",
            "description": "Notes for each get-together",
            "fieldType": "T",
            "slug": "meeting",
            "layoutColumn": 10,
            "displayOrder": 22,
            "updatesFeed": 1,
            "feedsTo": null,
            "isRequired": 0,
            "contents": "In Meeting: Petunia Dursley, Harry Potter, Severus Snape, Albus Dumbledore.",
            "sCreate": "2015-09-17T11:06:19.000Z",
            "sUpdate": null,
            "sIdUser": -1,
            "idIlp": 7,
            "idStudent": 17,
            "idField": 46
        }, {
            "sectionName": "Summary",
            "sectionDescription": "Used for Intakes and Updates",
            "sectionTitle": "Summary",
            "idSectionDef": 1,
            "idFieldDef": 2,
            "name": "Likes",
            "description": "What the student likes",
            "fieldType": "L",
            "slug": "likes",
            "layoutColumn": 10,
            "displayOrder": 5,
            "updatesFeed": 1,
            "feedsTo": null,
            "isRequired": 0,
            "contents": "Quidditch",
            "sCreate": "2015-09-17T11:06:19.000Z",
            "sUpdate": null,
            "sIdUser": -1,
            "idIlp": 7,
            "idStudent": 17,
            "idField": 47
        }, {
            "sectionName": "Summary",
            "sectionDescription": "Used for Intakes and Updates",
            "sectionTitle": "Summary",
            "idSectionDef": 1,
            "idFieldDef": 3,
            "name": "Dislikes",
            "description": "What the student preferes not to have",
            "fieldType": "L",
            "slug": "dislikes",
            "layoutColumn": 10,
            "displayOrder": 10,
            "updatesFeed": 1,
            "feedsTo": null,
            "isRequired": 0,
            "contents": null,
            "sCreate": "2015-09-17T11:06:19.000Z",
            "sUpdate": null,
            "sIdUser": -1,
            "idIlp": 7,
            "idStudent": 17,
            "idField": 48
        }, {
            "sectionName": "Summary",
            "sectionDescription": "Used for Intakes and Updates",
            "sectionTitle": "Summary",
            "idSectionDef": 1,
            "idFieldDef": 4,
            "name": "Family",
            "description": "Notes on the students family",
            "fieldType": "T",
            "slug": "family",
            "layoutColumn": 20,
            "displayOrder": 29,
            "updatesFeed": 1,
            "feedsTo": null,
            "isRequired": 0,
            "contents": "Parents deceased. Guardian ad Litem is Petunia Dursley.\nCurrently living under the stairs at the Dursley residence.",
            "sCreate": "2015-09-17T11:06:19.000Z",
            "sUpdate": null,
            "sIdUser": -1,
            "idIlp": 7,
            "idStudent": 17,
            "idField": 49
        }, {
            "sectionName": "Summary",
            "sectionDescription": "Used for Intakes and Updates",
            "sectionTitle": "Summary",
            "idSectionDef": 1,
            "idFieldDef": 5,
            "name": "Extra-Curricular",
            "description": "Favorite Extra-Curricular activities",
            "fieldType": "L",
            "slug": "ec",
            "layoutColumn": 10,
            "displayOrder": 20,
            "updatesFeed": 1,
            "feedsTo": null,
            "isRequired": 0,
            "contents": null,
            "sCreate": "2015-09-17T11:06:19.000Z",
            "sUpdate": null,
            "sIdUser": -1,
            "idIlp": 7,
            "idStudent": 17,
            "idField": 50
        }, {
            "sectionName": "Summary",
            "sectionDescription": "Used for Intakes and Updates",
            "sectionTitle": "Summary",
            "idSectionDef": 1,
            "idFieldDef": 6,
            "name": "Social/Emotional Notes",
            "description": "How the student interacts",
            "fieldType": "T",
            "slug": "learning",
            "layoutColumn": 20,
            "displayOrder": 25,
            "updatesFeed": 1,
            "feedsTo": null,
            "isRequired": 0,
            "contents": null,
            "sCreate": "2015-09-17T11:06:19.000Z",
            "sUpdate": null,
            "sIdUser": -1,
            "idIlp": 7,
            "idStudent": 17,
            "idField": 51
        }, {
            "sectionName": "Summary",
            "sectionDescription": "Used for Intakes and Updates",
            "sectionTitle": "Summary",
            "idSectionDef": 1,
            "idFieldDef": 7,
            "name": "Peer Group",
            "description": "Notes on friends/etc.",
            "fieldType": "T",
            "slug": "peers",
            "layoutColumn": 20,
            "displayOrder": 30,
            "updatesFeed": 1,
            "feedsTo": null,
            "isRequired": 0,
            "contents": "No friends at home. Bullied by Dudley. Strong friend group at school.",
            "sCreate": "2015-09-17T11:06:19.000Z",
            "sUpdate": null,
            "sIdUser": -1,
            "idIlp": 7,
            "idStudent": 17,
            "idField": 52
        }, {
            "sectionName": "Summary",
            "sectionDescription": "Used for Intakes and Updates",
            "sectionTitle": "Summary",
            "idSectionDef": 1,
            "idFieldDef": 8,
            "name": "Health",
            "description": "Any health concerns or regular things to watch for",
            "fieldType": "T",
            "slug": "health",
            "layoutColumn": 20,
            "displayOrder": 35,
            "updatesFeed": 1,
            "feedsTo": null,
            "isRequired": 0,
            "contents": null,
            "sCreate": "2015-09-17T11:06:19.000Z",
            "sUpdate": null,
            "sIdUser": -1,
            "idIlp": 7,
            "idStudent": 17,
            "idField": 53
        }, {
            "sectionName": "Summary",
            "sectionDescription": "Used for Intakes and Updates",
            "sectionTitle": "Summary",
            "idSectionDef": 1,
            "idFieldDef": 9,
            "name": "Academic Notes",
            "description": "How the student Learns",
            "fieldType": "",
            "slug": "academic",
            "layoutColumn": 20,
            "displayOrder": 27,
            "updatesFeed": 1,
            "feedsTo": null,
            "isRequired": 0,
            "contents": null,
            "sCreate": "2015-09-17T11:06:19.000Z",
            "sUpdate": null,
            "sIdUser": -1,
            "idIlp": 7,
            "idStudent": 17,
            "idField": 54
        }];

    }
})();
