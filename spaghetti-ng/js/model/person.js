'use strict';

/**
 * Created by mak on 6/24/16.
 */
(function() {

  /* { "name": "Max", "id": 1 } */

  function Person(name, friends, id) {
    this.name = name;
    this.friends = friends;
    this.id = id;
  }

  Person.prototype.getName = function() {
    return this.name;
  };

  Person.prototype.getFriends = function() {
    return this.friends;
  };

  Person.prototype.getId = function() {
    return this.id;
  };

  Person.bind = function(data) {
    return new Person(
      data.name,
      data.friends,
      data.id
    );
  };

  return Person;

})();
