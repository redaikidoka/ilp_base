(function() {
    'use strict';

    angular
        .module('ilpBase')
        .controller('LogoutController', LogoutController);

    /** @ngInject */
    function LogoutController($state, $rootScope, AuthService) {
        // var vm = this;
        // var console = $log;
        // var localUser = {};

        // console.log("logging out:", $rootScope.user);

        AuthService.logout();
        $state.go("login");


    }
})();
