'use strict';

(function (ng) {

  return angular
    .module('spaghetti-ng', [
      'ui.router'
    ])

    .config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {

      $urlRouterProvider

        .otherwise('/');

      $stateProvider

        .state('/home', {
          url: '/',
          templateUrl: '/spaghetti-ng/parts/home.html'
        })

        .state('/about', {
          url: '/about',
          templateUrl: '/spaghetti-ng/parts/about.html'
        });

    }]);

})(angular);
