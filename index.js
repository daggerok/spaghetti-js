'use strict';

$(document).ready(function() {

  const PPL = {

    $app: $('#app'),

    hbs: function(hbsSelector) {
      return Handlebars.compile($(hbsSelector).html());
    },

    then: function(people) {
      PPL.$app.html(PPL.hbs('#peopleTemplate')({ "people": people }));
    },

    fail: function(jqXHR, status, statusText) {

      const data = { "message": status + ': ' + statusText };

      PPL.$app.html(PPL.hbs('#errorTemplate')(data));
    },

    render: function() {

      $.getJSON('/api/people')
        .then(PPL.then)
        .fail(PPL.fail);
    }
  };

  PPL.render();

});
