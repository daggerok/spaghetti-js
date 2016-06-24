'use strict';

/**
 * Created by mak on 6/24/16.
 */
(function() {

  const URI = '/api/people';

  angular.module('spaghetti-ng')

    .factory('peopleService', [

      '$http', 'ngToast',
      function($http, ngToast) {

        function err(err) {
          ngToast.warning(JSON.stringify(err) || 'error');
        }

        function info(msg) {
          ngToast.info(msg);
        }

        return {

          get: function() {
            return $http.get(URI)
              .then(function(response) {
                const people = response.data;
                info('received: ' + JSON.stringify(people));
                return people;
              }, err);
          },

          getById: function(id) {
            return $http.get(URI + '/' + id)
              .then(function(response) {
                const person = response.data;
                info('received: ' + JSON.stringify(person));
                return person;
              }, err);
          },

          save: function(name) {
            return $http.post(URI, {name: name});
          },

          update: function(person) {
            return $http.put(URI + '/' + person.id, person)
              .then(function(response) {
                const res = response.data;
                info('updated: ' + JSON.stringify(res));
              }, err);
          },

          delete: function(id) {
            return $http.delete(URI + '/' + id)
          }
        }

      }]);

})();
