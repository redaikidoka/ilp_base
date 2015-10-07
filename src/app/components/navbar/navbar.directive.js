(function() {
  'use strict';

  angular
    .module('ilpBase')
    .directive('ilpNavbar', ilpNavbar);


  /** @ngInject */
  function ilpNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      scope: {
          user: '=',
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

      if (this.user)
{        console.log("Navbar for ", this.user, " on " + this.activetab);
      }      else 
 {       console.log("Navbar: no user");
       }      // console.log("Pic: ",vm.userpic);
      // console.log("activetab: " + vm.activetab);

      // "vm.creation" is avaible by directive option "bindToController: true"
      //vm.relativeDate = moment(vm.creationDate).fromNow();

      // vm.name = $scope.userName;
      // vm.pic = scope.idPic;
      //console.log($scope.userName);

    }
  }

})();
