'use strict';

/**
 * Created by mak on 6/24/16.
 */
(function() {

  angular.module('spaghetti-ng')

    .factory('peopleService', [

      '$http', 'toastService',
      function($http, toastService) {

        function ok(response) {
          if (response && response.data) {
            toastService.ok(response);
            return response.data;
          }
          return response;
        }

        function error(error) {
          toastService.err(error);
          return error;
        }

        return {

          // TODO: move this in app config
          URI: '/api/people',

          get: function() {
            return $http.get(this.URI)
              .then(ok, error);
          },

          getById: function(id) {
            return $http.get(this.URI + '/' + id)
              .then(ok, error);
          },

          save: function(name) {
            return $http.post(this.URI, {name: name})
              .then(ok, error);
          },

          update: function(person) {
            return $http.put(this.URI + '/' + person.id, person)
              .then(ok, error);
          },

          delete: function(id) {
            return $http.delete(this.URI + '/' + id);
          }
        }

      }]);

})();
