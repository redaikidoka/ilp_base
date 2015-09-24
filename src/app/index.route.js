(function() {
  'use strict';

  angular
    .module('ilpBase')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/home/home.html',
        controller: 'HomeController',
        controllerAs: 'home'
      })
      .state('classes', {
        url: '/classes',
        templateUrl: 'app/classes/classes.html',
        controller: 'ClassesController',
        controllerAs: 'classes'
      })
      .state('ilp', {
        url: '/ilp',
        templateUrl: 'app/ilp/ilp.html',
        controller: 'IlpController',
        controllerAs: 'ilp'
      })
      ;

    $urlRouterProvider.otherwise('/');
  }

})();
