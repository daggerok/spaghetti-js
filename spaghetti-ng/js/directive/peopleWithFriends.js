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
        scope: {
          message: '=' // looking for attr data-people; two-way data-binding
        },
        transclude: true,
        replace: true,
        link: function(scope, element, attrs) {
          console.log('arguments', arguments);
          element.on('click', function() {
            console.log(attrs.message);
            console.log('element ([0]) clicked:', element[0], 'with attributes:', attrs);
          });
        },
        controller: 'friendsController'
      };

    });

})();
