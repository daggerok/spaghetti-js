'use strict';

/**
 * Created by mak on 6/23/16.
 */
(function() {

  angular.module('spaghetti-ng')

    .controller('homeController', [

      '$scope', 'peopleService', 'ngToast', 'people',
      function($scope, peopleService, ngToast, people) {

        $scope.title = 'people';
        $scope.people = people;
        $scope.person = {};

        function err(err) {
          ngToast.warning(JSON.stringify(err) || 'error');
        }

        $scope.remove = function(id, index) {

          peopleService.delete(id)
            .then(function(data) {
              ngToast.warning('person (' + index + ') with id: ' +id + ' was removed.');
              $scope.people.splice(index, 1);
            }, err)
        };

        $scope.save = function(name) {

          peopleService.save(name)
            .then(function(response) {
              const person = response.data;
              ngToast.success(JSON.stringify(person));
              $scope.person.name = '';
              $scope.people.push(person);
            }, err);
        };

        $scope.update = function(person) {
          peopleService.update(person);
        }
    }]);

})();
