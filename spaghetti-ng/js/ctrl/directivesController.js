'use strict';

/**
 * Created by mak on 6/23/16.
 */
(function() {

  angular.module('spaghetti-ng')

    .controller('directivesController', [

      '$scope', 'peopleService',
      function($scope, peopleService) {

        $scope.title = 'directives';
        $scope.people = [];

        peopleService.get().then(function(response) {
          $scope.people = response;
        });
    }]);

})();
