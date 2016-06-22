'use strict';

$(document).ready(function () {

  const APP = {

    URI: '/api/people',
    disabled: 'disabled',
    errorTemplateId: '#errorTemplate',
    personTemplateId: '#personTemplate',
    peopleTemplateId: '#peopleTemplate',

    main: function() {
      this.cacheDom();
      this.registerListeners();
      this.registerPartials();
      this.renderPeople();
    },

    cacheDom: function() {
      this.$app = $('#app');
      this.$list = $('#list');
      this.$name = $('#name');
      this.$addPersonButton = $('#addPersonButton');
      this.$renderPeopleButton = $('#renderPeopleButton');
      this.isAfterRefresh = true;
    },

    registerListeners: function() {
      this.$renderPeopleButton.click(this.synchronize.bind(this));
      this.$addPersonButton.click(this.addPersonHandler.bind(this));
      this.$name.keyup(this.onKeyup.bind(this));
    },

    registerPartials: function() {
      return Handlebars.registerPartial('person', $(this.personTemplateId).html());
    },

    renderPeople: function() {
      $.getJSON(this.URI)
        .then(this.then.bind(this))
        .fail(this.fail.bind(this));
    },

    renderPerson: function(id, person) {
      const hbs = this.hbs(this.personTemplateId);
      const data = { 'id': person.id, 'name': person.name };

      this.$list.append(hbs(data));
    },

    onKeyup: function(event) {
      if (this.getName()) {
        this.enableAddPersonButton();
        const keyCode = event.keyCode || event.which;

        if (13 === keyCode) {
          this.addPersonHandler();
        }
      } else {
        this.disableAddPersonButton();
      }
    },

    addPersonHandler: function() {
      const name = this.getName();

      if (name) {
        this.$name.val('');

        $.post(this.URI, {name: name})
          .then(this.renderPeople.bind(this))
          .fail(this.fail)
      }
      this.disableAddPersonButton();
    },

    getName: function() {
      return this.$name.val();
    },

    resetDom: function() {
      this.$name.val('');
      this.disableAddPersonButton();
    },

    enableAddPersonButton: function() {
      this.$addPersonButton.removeClass(this.disabled);
    },

    disableAddPersonButton: function() {
      this.$addPersonButton.addClass(this.disabled);
    },

    synchronize: function() {
      this.isAfterRefresh = true;
      this.$list.html('');
      this.renderPeople();
    },

    then: function(people) {

      const hbs = this.hbs(this.peopleTemplateId);

      this.$app.html(hbs({ "people": people }));

      if (this.isAfterRefresh) {
        $.each(people, this.renderPerson.bind(this));
        this.isAfterRefresh = false;
      }
    },

    fail: function(jqXHR, status, statusText) {
      const hbs = this.hbs(this.errorTemplateId);
      const data = { "message": status + ': ' + statusText };

      this.$app.html(hbs(data));
      console.log(jqXHR);
    },

    hbs: function(hbsSelector) {
      return Handlebars.compile($(hbsSelector).html());
    }

  };

  APP.main();

});
