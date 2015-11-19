(function() {
  'use strict';

  angular
    .module('ilpBase')
    .controller('SandboxController', SandboxController);

  /** @ngInject */
  function SandboxController() {
    var vm = this;

    vm.thing = {};
    vm.listthing = [];

  }
})();
