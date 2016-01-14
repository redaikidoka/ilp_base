(function() {
    'use strict';

    angular
        .module('ilpBase')
        .directive('ilpNav', ilpNav);


    /** @ngInject */
    function ilpNav() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/ilpNav/ilpNav.html',
            scope: {
                // user: '=',
                // activetab: '='
            },
            //link: linkFunc,
            controller: NavController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        // function linkFunc(scope, el, attr, vm) {
        //     // var console = $log;
        //     // $log.debug("navbar.linkF");
        //     // $log.debug("pic: " + scope.userpic);
        //     // $log.debug("activeTab" + scope.activetab);
        //     //console.log("nvabar.linkFunc", scope, el, attr, vm);

        // }

        /** @ngInject */
        function NavController($log, $scope, $rootScope) {
            // var vm = this;
            // var console = $log;
            
            if ($rootScope.user)
            {
            	this.user = $rootScope.user;
            	// console.log("We have user in ilpNav");
            }
            // else {
            //     this.user = {
            //         "name" : "Severus Snape",
            //         "username" : "snape",
            //         "password" : "debug",
            //         "thumbnail" : "assets/images/snape.jpg",
            //         "validated" : false,
            //         "loggedin" : true
            //     };
               
            // }

            $scope.getStaffPhoto = function(_image) {
                var fullimage= "assets/images/staff/" + _image;
                console.log("image for user ", this.user.name, fullimage);
                return fullimage;
            };

        }
    }

})();
