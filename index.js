'use strict';

$(document).ready(function() {

  const PPL = {

    $app: $('#app'),

    hbs: function(hbsSelector) {
      return Handlebars.compile($(hbsSelector).html());
    },

    then: function(json) {
      PPL.$app.html(PPL.hbs('#peopleTemplate')({ "people": json }));
    },

    fail: function(jqXHR, status, statusText) {

      const data = { "message": status + ': ' + statusText };

      PPL.$app.html(PPL.hbs('#errorTemplate')(data));
    },

    render: function() {

      $.getJSON('/api/people1')
        .then(PPL.then)
        .fail(PPL.fail);
    }
  };

  PPL.render();

});
