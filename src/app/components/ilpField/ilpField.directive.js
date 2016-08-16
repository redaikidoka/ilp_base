(function() {
    'use strict';

    angular
        .module('ilpBase')
        .directive('ilpField', ilpField);


    /** @ngInject */
    function ilpField() {
        var directive = {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/components/ilpField/ilpField.html',
            require: 'ngModel',
            scope: {
                datafield: '=',
                onchangecallback: '&'
            },
            // link: linkField,
            controller: ilpFieldController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;


        /** @ngInject */
        function ilpFieldController($scope, $element, $attrs, $location, $log, AuthService, dtaIlp) {
            var vm = this;

            //setup logging
            var console = $log;

            vm.showQuestions = 0;
            vm.showHistory = 0;

            // console.log("for this field def id", $scope.datafield, " i got these questions: ", $scope.myQuestions);

            $scope.getHeaderColor = function(fld) {
                // console.log(fld);

                if (!fld.contents) {
                    return 'hilite';
                }
                return '';
            };

            $scope.getRows = function() {
                // for SHORT TEXT fields (TS), rows = 1
                if (vm.datafield.fieldType === "TS") {
                    return 2; }
                // console.log("regular field", vm.datafield);
                return 8;
            };

            $scope.showTextArea = function() {
                if (vm.datafield.fieldType === "TS" || vm.datafield.fieldType === "L" || vm.datafield.fieldType === "T")
                {
                    return true;
                }

                return false;
            }

            $scope.editField = function() {
                // console.log("field we are saving:", vm.datafield);

                // var results = dtaIlp.updateFieldItem(vm.datafield);
                // console.log("save results:", results);
                dtaIlp.updateFieldItem(vm.datafield).then(function(results) {
                    console.log("ilpField: result of update:", results);
                    vm.datafield.sUser = AuthService.getUserId();
                    vm.datafield.sUpdate = Date.now(); //results.sUpdate; 
                    // console.log("Date vs supdate", Date.now(), results.sUpdate);

                    // console.log("update function: ", $scope.onchangecallback);
                    // $parent.$scope.checkilp();
                    // $scope.checkilp();
                    if (vm.onchangecallback) {
                        console.log("callback!");
                        vm.onchangecallback();
                    }
                    else { console.log("no callback. :(");}
                }, function(err) {
                    // TODO: Show an error here

                    // Error occurred
                    console.log("ilpField::editField Field Update Failed :(", err);
                });
            };
        }
    }

})();
