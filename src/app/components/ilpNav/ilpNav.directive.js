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
                user: '=',
                activetab: '='
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
        function NavController($log, $rootScope) {
            // var vm = this;
            var console = $log;
            
            if ($rootScope.user)
            {
            	this.user = $rootScope.user;
            	console.log("We have user in ilpNav");
            }
            
            // if (this.user) {
            //     console.log("ilpNav for ", this.user, " on " + this.activetab);
            // } else {
            //     console.log("ilpNav: no user");
            // } 

            if (1) //TODO: FIND A WAY TO BUILD DEBUG IN
            {
                this.user = {
                    "name" : "Filius Flitwick",
                    "username" : "filius",
                    "password" : "debug",
                    "thumbnail" : "assets/images/flitwick.jpeg",
                    "validated" : false,
                    "loggedin" : true
                };

                //console.log("debug user: ", this.user);
            }



        }
    }

})();
