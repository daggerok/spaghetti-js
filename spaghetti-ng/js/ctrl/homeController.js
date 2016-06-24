'use strict';

/**
 * Created by mak on 6/23/16.
 */
(function() {

  angular.module('spaghetti-ng')

    .controller('homeController', [

      '$scope', '$http', 'ngToast', 'people',
      function($scope, $http, ngToast, people) {

        $scope.title = 'people';
        $scope.people = people;
        $scope.person = {};

        function err(err) {
          ngToast.error(err, 'err');
        }

        $scope.remove = function(id, index) {

          $http.delete('/api/people/' + id)
            .then(function(data) {
              ngToast.warning('person (' + index + ') with id: ' +id + ' was removed.');
              $scope.people.splice(index, 1);
            }, err)
        };

        $scope.save = function() {
          $http.post('/api/people', $scope.person)
            .then(function(response) {
              const person = response.data;
              ngToast.success(JSON.stringify(person));
              $scope.person.name = '';
              $scope.people.push(person);
            }, err)
        };

        $scope.update = function(person) {

          $http.put('/api/people/' + person.id, person)
            .then(function(response) {
              const res = response.data;
              ngToast.success(JSON.stringify(res));
            }, err)
        }
    }]);

})();
