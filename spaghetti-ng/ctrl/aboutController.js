'use strict';

/**
 * Created by mak on 6/23/16.
 */
(function(ng) {

  return ng
    .module('spaghetti-ng')
    .controller('aboutController', ['$scope', function($scope) {
      $scope.title = 'about';
    }]);

})(angular);
