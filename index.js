'use strict';

$(document).ready(function () {

  const PPL = {

    disabled: 'disabled',
    POST_URI: '/api/people',
    GET_URI: '/api/people?size=30&sort=id,desc',
    personPartialTemplateId: '#personPartialTemplate',
    peopleTemplateId: '#peopleTemplate',
    errorTemplateId: '#errorTemplate',

    main: function() {
      this.cacheDom();
      this.binding();
      this.helper();
      this.render();
    },

    cacheDom: function() {
      this.$app = $('#app');
      this.$username = $('#username');
      this.$addPersonButton = $('#addPersonButton');
      this.$retryButton = $('#retryButton');
    },

    binding: function() {
      this.$username.keyup(this.onUsernameKeyup.bind(this));
      this.$addPersonButton.click(this.onAddPersonButtonClick.bind(this));
      this.$retryButton.click(this.render.bind(this));
    },

    helper: function() {
      return Handlebars.registerPartial('person', $(this.personPartialTemplateId).html());
    },

    render: function() {
      $.getJSON(this.GET_URI)
        .then(this.then.bind(this))
        .fail(this.fail.bind(this));
    },

    onUsernameKeyup: function(event) {
      const keyCode = event.keyCode || event.which;
      const currentValue = this.getUsername();

      // some key was pressed
      if (currentValue) {
        this.enableAddPersonButton();

        // enter was pressed
        if (13 === keyCode) {
          this.addPerson(this.getUsername());
        }

      }
      // input value is empty
      else {
        this.disableAddPersonButton();
      }
    },

    onAddPersonButtonClick: function() {
      if (this.addPersonButtonIsEnabled()) {
        this.addPerson(this.getUsername());
      }
    },

    enableAddPersonButton: function() {
      this.$addPersonButton.removeClass(this.disabled);
    },

    getUsername: function() {
      return this.$username.val();
    },

    addPerson: function(username) {
      if (username) {
        this.post(username)
          .then(this.appendChild.bind(this))
          .fail(this.fail.bind(this));

        this.resetDom();
      }
    },

    post: function(username) {
      return $.ajax({
        url: this.POST_URI,
        type: 'post',
        contentType : 'application/json',
        data: this.toPerson(username)
      });
    },

    disableAddPersonButton: function() {
      this.$addPersonButton.addClass(this.disabled);
    },

    toPerson: function(username) {
      return JSON.stringify({name: username});
    },

    resetDom: function() {
      this.clearUsernameValue();
      this.disableAddPersonButton();
    },

    addPersonButtonIsEnabled: function() {
      return !this.$addPersonButton.hasClass(this.disabled);
    },

    clearUsernameValue: function() {
      this.$username.val('');
    },

    appendChild: function(data) {
      if (!this.$app.find('ul').is(":visible")) {
        this.render();
      } else {
        const hbs = this.hbs(this.personPartialTemplateId);

        this.$app.find('ul').prepend(hbs(data));
      }
    },

    then: function(data) {
      const hbs = this.hbs(this.peopleTemplateId);

      this.$app.html(hbs(this.parsePeopleFromHateoas(data)));
    },

    fail: function(jqXHR, status, statusText) {
      const hbs = this.hbs(this.errorTemplateId);
      const data = { "message": status + ': ' + statusText };

      this.$app.html(hbs(data));
    },

    parsePeopleFromHateoas: function (data) {
      return { 'people' : data._embedded.people };
    },

    hbs: function(hbsSelector) {
      return Handlebars.compile($(hbsSelector).html());
    }

  };

  PPL.main();

});
