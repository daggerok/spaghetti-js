'use strict';

(function (ng) {

  return ng
    .module('spaghetti-ng', [
      'ui.router'
    ])

    .config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {

      $urlRouterProvider

        .otherwise('/');

      $stateProvider

        .state('/home', {
          url: '/',
          templateUrl: '/spaghetti-ng/parts/home.html',
          controller: 'homeController',
          resolve: {
            people: ['$http', function($http) {
              return $http.get('/api/people')
                .then(
                  function(response) {
                    return response.data;
                  }
                );
            }]
          }
        })

        .state('/about', {
          url: '/about',
          templateUrl: '/spaghetti-ng/parts/about.html',
          controller: 'aboutController'
        });

    }]);

})(angular);
