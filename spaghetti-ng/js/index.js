'use strict';

(function() {

  angular.module('spaghetti-ng', [
    'ui.router', 'ngToast'
  ])

    .config([

      '$stateProvider', '$urlRouterProvider', 'ngToastProvider',
      function($stateProvider, $urlRouterProvider, ngToastProvider) {

        ngToastProvider.configure({
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          combineDuplications: true,
          dismissOnClick: true,
          animation: 'slide',
          timeout: 10000,
          maxNumber: 10
        });

        $urlRouterProvider

          .otherwise('/');

        // TODO: move this in app config
        const VIEWS_URI = '/spaghetti-ng/htmls';

        $stateProvider

          .state('/', {
            url: '/',
            templateUrl: VIEWS_URI + '/home.html',
            controller: 'homeController'
            /*,
            resolve: {
              people: ['peopleService', function(peopleService) {
                return peopleService.get();
              }]
            }
            */
          })

          .state('/directives', {
            url: '/directives',
            templateUrl: VIEWS_URI + '/directives.html',
            controller: 'directivesController'
          });

      }]);

})();
