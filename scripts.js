// immediately invoked functional expression
(function() {
  'use strict';

  window.Filtered = function(options) {

    this.list = null;
    this.listItems = null;
    this.filteredList = null;
    this.sandbox = null;

    var defaults = {
      selector: '.filter-me',
      type: "shuffle",
      direction: "asc"
    }

    // Create options by extending defaults with the passed in arugments
    if (options && typeof options === "object") {
      this.options = extendDefaults(defaults, options);
    } else {
      this.options = defaults;
    }

  }

  Filtered.prototype.filter = function(filterBy, newDirection) {
    this.list = document.querySelector(this.options.selector);
    this.listItems = this.list.children;
    this.sandbox = document.createDocumentFragment();
    this.filteredList = [];
    var filterBy = (filterBy) ? filterBy : this.options.type,
        direction = (newDirection) ? newDirection : this.options.direction;

    for (var i in this.listItems) { // Add list items to filteredList property
      if (typeof this.listItems[i] === "object") {
        this.filteredList.push(this.listItems[i]);
      }
    }

    switch(filterBy) {
      case "az":
        this.filteredList.sort(function(a, b) { // Sort this.filteredList array
          return a.dataset.filtered == b.dataset.filtered ? 0 : (a.dataset.filtered > b.dataset.filtered ? 1 : -1);
        });
        break;
      case "shuffle":
        this.filteredList.sort(function(a, b) {
          var random = Math.floor(Math.random()*199) - 99;
          return random;
        });
        break;
      default:
        var type = this.options.type;
        this.filteredList.sort(function(a, b) { // Sort this.filteredList array by any datatype passed
          return a.dataset[type] == b.dataset[type] ? 0 : (a.dataset[type] > b.dataset[type] ? 1 : -1);
        });
    }

    if (this.options.direction === "desc") {
      this.filteredList.reverse();
    }

    for (var i = 0; i < this.filteredList.length; ++i) {
      this.sandbox.appendChild(this.filteredList[i]);
    }

    this.list.appendChild(this.sandbox);
  }

  // Utility method to extend defaults with user options
  function extendDefaults(source, properties) {
    for (var property in properties) {
      if (properties.hasOwnProperty(property)) {
        source[property] = properties[property];
      }
    }
    return source;
  }

}());