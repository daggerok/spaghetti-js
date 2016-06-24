'use strict';

(function() {

  angular.module('spaghetti-ng', [
    'ui.router', 'ngToast'
  ])

    .config([
      '$urlRouterProvider', '$stateProvider',
      function($urlRouterProvider, $stateProvider) {

        $urlRouterProvider

          .otherwise('/');

        $stateProvider

          .state('/home', {
            url: '/',
            templateUrl: '/spaghetti-ng/htmls/home.html',
            controller: 'homeController',
            resolve: {
              people: [
                '$http', 'ngToast',
                function($http, ngToast) {

                  return $http.get('/api/people')
                    .then(
                      function(response) {
                        return response.data;
                      },
                      function(err) {
                        ngToast.error(err, 'err');
                      }
                    );
                }]
            }
          })

          .state('/about', {
            url: '/about',
            templateUrl: '/spaghetti-ng/htmls/about.html',
            controller: 'aboutController'
          });

      }]);

})();
