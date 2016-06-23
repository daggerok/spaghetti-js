'use strict';

$(document).ready(function () {

  const APP = {

    URI: '/api/people',
    disabled: 'disabled',
    errorTemplateId: '#errorTemplate',
    peopleTemplateId: '#peopleTemplate',
    viewClass: 'span.view',
    removePersonClass: 'span.glyphicon.glyphicon-remove',
    editPersonClass: 'span.glyphicon.glyphicon-pencil',
    editClass: 'input.edit',
    cancelEditPersonClass: 'span.glyphicon-remove-circle',
    updatePersonClass: 'span.glyphicon.glyphicon-ok-circle',

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
      this.$app.delegate(this.editPersonClass, 'click', this.editPersonHandler.bind(this));
      this.$app.delegate(this.cancelEditPersonClass, 'click', this.cancelEditPersonHandler.bind(this));
      this.$app.delegate(this.updatePersonClass, 'click', this.updatePersonHandler.bind(this));
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

    parent: function(event) {
      return $(event.target).closest('li');
    },

    uriWithId: function(event) {
      return this.URI + '/' + this.parent(event).attr('data-person-id');;
    },

    removePersonHandler: function(event) {
      const $parent = this.parent(event);
      const url = this.uriWithId(event);

      $.ajax({ type: 'delete', url: url })
        .fail(this.fail.bind(this))
        .then(function removeParent() {
          $parent.toggle('fast').remove('fast');
        });
    },

    editPersonHandler: function(event) {
      this.toggle(this.parent(event), true);
    },

    cancelEditPersonHandler: function(event) {
      this.toggle(this.parent(event), false);
    },

    toggle: function($parent, on) {
      if (on) {
        $parent.find(this.removePersonClass).hide();
        $parent.find(this.editPersonClass).hide();
        $parent.find(this.viewClass).hide();

        $parent.find(this.editClass).show();
        $parent.find(this.updatePersonClass).show();
        $parent.find(this.cancelEditPersonClass).show();
      } else {
        $parent.find(this.removePersonClass).show();
        $parent.find(this.editPersonClass).show();
        $parent.find(this.viewClass).show();

        $parent.find(this.editClass).hide();
        $parent.find(this.updatePersonClass).hide();
        $parent.find(this.cancelEditPersonClass).hide();
      }
    },

    updatePersonHandler: function(event) {
      const $parent = this.parent(event);
      const url = this.uriWithId(event);
      const name = $parent.find(this.editClass).val();

      $.ajax({ type: 'put', url: url, data: { name: name } })
        .fail(this.fail.bind(this))
        .then(function updateParent() {
          $parent.find(this.viewClass).html(name);
          this.toggle($parent, false);
        }.bind(this));
    },

    mustache: function(templateId, data) {
      return Mustache.render($(templateId).html(), data);
    }

  };

  APP.main();

});
