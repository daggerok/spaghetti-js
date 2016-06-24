'use strict';

/**
 * Created by mak on 6/23/16.
 */
(function() {

  angular.module('spaghetti-ng')

    .controller('homeController', [

      '$scope', 'peopleService',
      function($scope, peopleService) {

        $scope.title = 'people';
        $scope.person = {};
        $scope.people = [];

        peopleService.get().then(function(response) {
          $scope.people = response;
        });

        $scope.save = function(name) {
          peopleService.save(name)
            .then(function(person) {
              $scope.person.name = '';
              $scope.people.push(person);
            });
        };

        $scope.update = function(person) {
          peopleService.update(person);
        };

        $scope.remove = function(id, index) {
          peopleService.delete(id)
            .then(function(response) {
              $scope.people.splice(index, 1);
            });
        };
    }]);

})();
