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
        controllerAs: 'home',
        authenticate: false
      })
      .state('login', {
        url: '/login',
        templateUrl: 'app/home/home.html',
        controller: 'HomeController',
        controllerAs: 'home',
        authenticate: false
      })
      .state('myclasses', {
        url: '/myclasses',
        templateUrl: 'app/classes/classes.html',
        controller: 'ClassesController',
        controllerAs: 'myclasses',
        authenticate: true
      })
      .state('myclasses.class', {
        url: '/class/{classId}',
        templateUrl: 'app/classes/classlist.html',
        controller: 'ClassListController',
        controllerAs: 'aclass',
        authenticate: true
      })
      .state('ilp', {
        url: '/ilp/{idStudent}?idClass',
        templateUrl: 'app/ilp/ilp.html',
        controller: 'IlpController',
        controllerAs: 'ilp',
        authenticate: true
      })
      .state('ilp.section', {
        url: '/section/{idSection}',
        templateUrl: 'app/ilp/ilpSection.html',
        // controller: 'ilpSectionController',
        // controllerAs: 'ilpSection',
        authenticate: true
      })
      .state('ilp.summary', {
        url: '/ilp/{idStudent}/summary',
        templateUrl: 'app/ilp/summary.html',
        controller: 'ilpSummaryController',
        controllerAs: 'ilpSummary',
        authenticate: true
      })
       .state('ilp.goals', {
        url: '/ilp/{idStudent}/goals',
        templateUrl: 'app/ilp/summary.html',
        controller: 'ilpSummaryController',
        controllerAs: 'ilpSummary'
      })
      .state('sandbox', {
        url: '/sandbox',
        templateUrl: 'app/sandbox/sandbox.html',
        controller: 'SandboxController',
        controllerAs: 'sandbox',
        authenticate: false
      })
      .state('feed', {
        url: '/feed',
        templateUrl: 'app/feed/feed.html',
        controller: 'FeedController',
        controllerAs: 'feed',
        authenticate: false
      })      
       ;

    $urlRouterProvider.otherwise('/');
  }

})();
