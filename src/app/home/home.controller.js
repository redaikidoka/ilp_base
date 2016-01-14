(function() {
    'use strict';

    angular
        .module('ilpBase')
        .controller('HomeController', HomeController);

    /** @ngInject */
    function HomeController($scope, $log, $state, $rootScope, AuthService) {
        // var vm = this;
        var console = $log;
        // var localUser = {};
        $scope.user = {};
        $scope.loginproblem = false;
        $scope.loginmessage = '';
        $scope.customBodyClass = 'home';

        console.log($rootScope.bodyClass);


        $scope.login = function(user, pw) {
            // hand things off to the AuthService
            AuthService.login(user, pw).then(
                function() {
                    // console.log("home:: positive login for: ", result);
                    $state.go('myclasses');
                    $rootScope.$broadcast('goToState', 'myclasses');
                },
                function(err) {
                    console.log("didn't login. :(", err);
                    $scope.loginproblem = true;
                    $scope.loginmessage = err;
                });

        };

        $scope.getBodyClass = function() {
            return 'home';
        };

        $scope.hasProblem = function() {
            if ($scope.loginproblem === true) {
                return true;
            }

            return false;
        };

    }
})();
