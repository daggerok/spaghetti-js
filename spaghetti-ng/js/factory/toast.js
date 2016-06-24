'use strict';

/**
 * Created by mak on 6/24/16.
 */
(function() {

  angular.module('spaghetti-ng')

    .factory('toastService', ['ngToast', function(ngToast) {

      return {

        ok: function ok(response) {
          console.log('response:', response && response.data ? response.data : response);
          if (response && response.data) {
            ngToast.info(JSON.stringify(response.data));
          }
        },

        err: function err(error) {
          console.log(error);
          if (error) {
            ngToast.danger('error:', JSON.stringify(error) || 'unknown');
          }
        }
      }

    }]);

})();
