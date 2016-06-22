'use strict';

$(document).ready(function () {

  const APP = {

    URI: '/api/people',
    disabled: 'disabled',
    removePersonClass: 'li span.glyphicon.glyphicon-remove.alert-danger',
    errorTemplateId: '#errorTemplate',
    peopleTemplateId: '#peopleTemplate',

    main: function() {
      this.cacheDom();
      this.registerListeners();
      this.renderPeople();
    },

    cacheDom: function() {
      this.$app = $('#app');
      this.$name = $('#name');
      this.$addPersonButton = $('#addPersonButton');
      this.$app.delegate(this.removePersonClass, 'click', this.removePersonHandler.bind(this));
    },

    registerListeners: function() {
      this.$addPersonButton.click(this.addPersonHandler.bind(this));
      this.$name.keyup(this.onKeyup.bind(this));
    },

    renderPeople: function() {
      $.getJSON(this.URI)
        .then(this.then.bind(this))
        .fail(this.fail.bind(this));
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

    then: function(people) {
      this.$app.html(this.mustache(this.peopleTemplateId, { "people": people }));
    },

    fail: function(jqXHR, status, statusText) {
      const data = { 'message': status + ': ' + statusText };
      this.$app.html(this.mustache(this.errorTemplateId, data));
    },

    removePersonHandler: function(event) {
      const $span = $(event.target);
      const url = this.URI + '/' + $span.attr('data-person-id');

      $.ajax({ type: 'delete', url: url })
        .fail(this.fail.bind(this))
        .then(function removeParentLi() {
          $span.closest('li').toggle('fast').remove('fast');
        });
    },

    mustache: function(templateId, data) {
      return Mustache.render($(templateId).html(), data);
    }

  };

  APP.main();

});
