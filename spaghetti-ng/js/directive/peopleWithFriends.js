'use strict';

/**
 * Created by mak on 6/24/16.
 */
(function() {

  angular.module('spaghetti-ng')

    .directive('peopleWithFriends', function() {

      // TODO: move this in app config
      const VIEWS_URI = '/spaghetti-ng/htmls';
      const DIRECTIVES_URI = VIEWS_URI + '/directive';
      
      return {

        restrict: 'E',
        templateUrl: DIRECTIVES_URI + '/people-with-friends.html',
        controller: 'friendsController'
      };

    });

})();
