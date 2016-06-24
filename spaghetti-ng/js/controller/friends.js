'use strict';

/**
 * Created by mak on 6/23/16.
 */
(function() {

  angular.module('spaghetti-ng')

    .controller('friendsController', [

      '$scope', 'peopleService',
      function($scope, peopleService) {

        $scope.title = 'friends';
        $scope.people = [];
        // view variables:
        $scope.friendsAreHidden;
        $scope.message;

        peopleService.findAll().then(function(response) {
          $scope.people = response;
          console.log($scope.message);
        });
    }]);

})();
