'use strict';

/**
 * Created by mak on 6/23/16.
 */
(function(ng) {

  return ng
    .module('spaghetti-ng')
    .controller('homeController', ['$scope', function($scope) {
      $scope.title = 'people';
      $scope.people = [
        {
          "name": "anonymous",
          "id": 1
        },
        {
          "name": "daggerok",
          "id": 2
        }
      ];
    }]);

})(angular);
