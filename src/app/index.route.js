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
      .state('login', {
        url: '/login',
        templateUrl: 'app/home/home.html',
        controller: 'LoginController',
        controllerAs: 'login'
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
      .state('sandbox', {
        url: '/sandbox',
        templateUrl: 'app/sandbox/sandbox.html',
        controller: 'SandboxController',
        controllerAs: 'sandbox'
      })
      .state('feed', {
        url: '/feed',
        templateUrl: 'app/feed/feed.html',
        controller: 'FeedController',
        controllerAs: 'feed'
      })      
       ;

    $urlRouterProvider.otherwise('/');
  }

})();
