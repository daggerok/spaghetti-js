'use strict';

$(document).ready(function () {

  const PPL = {

    $app: $('#app'),

    render: function () {

      $.getJSON('/api/people')
        .then(PPL.then)
        .fail(PPL.fail);
    },

    then: function (people) {

      const hbs = PPL.hbs('#peopleTemplate');

      PPL.$app.html(hbs({ "people": people }));
    },

    fail: function (jqXHR, status, statusText) {

      const hbs = PPL.hbs('#errorTemplate');
      const data = { "message": status + ': ' + statusText };

      PPL.$app.html(hbs(data));
    },

    hbs: function (hbsSelector) {
      return Handlebars.compile($(hbsSelector).html());
    }

  };

  PPL.render();

});
