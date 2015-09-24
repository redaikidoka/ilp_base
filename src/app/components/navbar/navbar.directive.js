(function() {
  'use strict';

  angular
    .module('ilpBase')
    .directive('acmeNavbar', acmeNavbar);


  /** @ngInject */
  function acmeNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      scope: {
           username: '=',
           userpic: '=',
           activetab: '='
      },
      // link: linkFunc,
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

   // function linkFunc(scope, el, attr, vm) {
        //var console = $log;
   //    // $log.debug("navbar.linkF");
   //    // $log.debug("pic: " + scope.userpic);
   //    // $log.debug("activeTab" + scope.activetab);
   //    console.log("nvabar.linkFunc", scope, el, attr, vm);

   //  }

    /** @ngInject */
    function NavbarController($log) {
      // var vm = this;
      var console = $log;

      console.log("Navbar for " + this.username + " on " + this.activetab);
      // console.log("Pic: ",vm.userpic);
      // console.log("activetab: " + vm.activetab);

      // "vm.creation" is avaible by directive option "bindToController: true"
      //vm.relativeDate = moment(vm.creationDate).fromNow();

      // vm.name = $scope.userName;
      // vm.pic = scope.idPic;
      //console.log($scope.userName);

    }
  }

})();
