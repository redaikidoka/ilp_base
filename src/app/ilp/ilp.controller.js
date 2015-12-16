(function() {
    'use strict';

    angular
        .module('ilpBase')
        .controller('IlpController', IlpController);

    /** @ngInject */
    function IlpController($scope, $stateParams, $state, $log, dtaIlp, dtaClass, $filter) {
        var vm = this;
        var console = $log;

        // setup the variable for our student dropdown list
        vm.selectedStudent = null;

        // verify the student id
        if ($stateParams.idStudent) {
            vm.idStudent = $stateParams.idStudent;
        }
        else { 
            //TODO: Load the last student / first student? First class? Rootscope?
            vm.idStudent = 23; 
        }
        

        if ($stateParams.idClass) {
            vm.idClass = $stateParams.idClass;
        }
        else { 
            vm.idClass = 1;
            console.log("ilp: no class id. :(", $stateParams);
        }

        // get the class for this student
        dtaClass.getClass(vm.idClass).then(function(results){
                console.log("ilp: loaded class", results);
                vm.currentClass = results;
            }, function(err) {
                //TODO: show an error here
                console.log("ilp:no class :(", err);
            });

        // grab that class' list of students
        dtaClass.getStudentList(vm.idClass).then(function(results){
                console.log("ilp: loaded students", results);
                vm.studentList = results;
            }, function(err) {
                //TODO: show an error here
                console.log("ilp:no students :(", err);
            });
        

        // fetch the student
        dtaIlp.getStudent(vm.idStudent).then(function(results){
            console.log("ilp:Got a student!", results);
            vm.student = results;

            $scope.setDefaultStudent(vm.student.idStudent);

        }, function(err) {
            // TODO: Show an error here

            // Error occurred
            console.log("no student. :(", err);
        });

        // get the section list
        dtaIlp.getSections().then(function(sexions){
            vm.sexions = sexions;
        }, function(err){
            console.log("no sections. :(", err);
        });

        // fetch the plan
        dtaIlp.getPlan(vm.idStudent).then(function(results){
            vm.plan = results;
            console.log("the plan I got back", vm.plan);


            dtaIlp.getFields(vm.plan.idIlp).then(function(fields){
                vm.plan.fields = fields;

                $scope.checkilp();
            }); 

                    
        }, function(err) {
            // Error occurred
            // TODO: Show an error here
            console.log("no plan. :(", err);
        });
        

        $scope.setDefaultStudent = function(studentId) {
            // console.log("looking for student: ", studentId);
             var found = $filter('filter')(vm.studentList, {idStudent: studentId}, true);
             if (found && found.length) {
                 vm.selectedStudent = found[0];
             } else {
                 vm.selectedStudent = null;
             }

             // console.log("found:", found);
        };

        // if there are field contents', we turn green
        $scope.getHeaderColor = function(fld) {
            if (!fld.contents) {
                return 'hilite';
            }
            return '';
        };

        $scope.getStudentPhoto = function(picture) {
            var imagepath = "/assets/images/";
            // return their picture
            if (picture)
                { return imagepath + "students/" + picture; }

            // if there's no student,return blank.
            if (!vm.student) {  
                return '';
            }

            //placeholder
            if(vm.student.gender) {
                if (vm.student.gender.substring(0,1).toUpperCase() === "F")
                {
                    return imagepath + "placeholder/" + "female.jpg";
                }
                else {
                    return imagepath + "placeholder/" + "male.jpg";
                }
            }
            else {
                return  imagepath + "placeholder/" + "cat.jpg";
            }


        };

        $scope.checkilp = function() {
            // console.log("checkingthe ILP", vm.plan, vm.plan.fields, vm.plan.intakeDone);

            if (!vm.plan || !vm.plan.fields) {return false;}
            if (vm.plan.intakeDone) { return true;}

            vm.plan.intakeDone = true;

            for (var i=0; i<vm.plan.fields.length; i++)
            {
                if (!vm.plan.fields[i].contents)
                {
                    vm.plan.intakeDone = false;
                    return;
                }
            }

            console.log("done?", vm.plan.intakeDone);
            if (vm.plan.intakeDone) {
                vm.plan.$save();
            }
        };

        $scope.switchIlp = function() {
            console.log('switch ilp to: ', vm.selectedStudent.idStudent, vm.idClass);

             $state.go('ilp', 
                {idStudent: vm.selectedStudent.idStudent, 
                idClass: vm.idClass}
            );

        };


    }
})();
