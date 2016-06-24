'use strict';

(function() {

  angular.module('spaghetti-ng', [
    'ui.router', 'ngToast'
  ])

    .config([
      '$urlRouterProvider', '$stateProvider', 'ngToastProvider',
      function($urlRouterProvider, $stateProvider, ngToastProvider) {

        $urlRouterProvider

          .otherwise('/');

        $stateProvider

          .state('/home', {
            url: '/',
            templateUrl: '/spaghetti-ng/htmls/home.html',
            controller: 'homeController',
            resolve: {
              people: ['peopleService', function(peopleService) {
                return peopleService.get();
              }]
            }
          })

          .state('/about', {
            url: '/about',
            templateUrl: '/spaghetti-ng/htmls/about.html',
            controller: 'aboutController'
          });

        ngToastProvider
          .configure({
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            combineDuplications: true,
            dismissOnClick: true,
            animation: 'slide',
            timeout: 10000,
            maxNumber: 10
          });
        
      }]);

})();
