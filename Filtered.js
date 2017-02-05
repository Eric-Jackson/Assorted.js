// immediately invoked functional expression
(function() {
  'use strict';

  window.Filtered = function(options) {

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

    this.list = document.querySelector(this.options.selector);
    this.listItems = this.list.children;
    this.filteredList = [];
    this.sandbox = document.createDocumentFragment();

  }

  Filtered.prototype.filter = function(filterBy, newDirection) {
    var filter = filterBy ? filterBy : this.options.type,
        direction = newDirection ? newDirection : this.options.direction;

    rebuildNodeList(this.filteredList, this.listItems); // Rebuild this.listItems as this.filteredList
    this.sort(filter, direction);

    for (var i = 0; i < this.filteredList.length; ++i) {
      this.sandbox.appendChild(this.filteredList[i]);
    }

    this.list.appendChild(this.sandbox);
  }

  Filtered.prototype.sort = function(filter, direction) {
    switch(filter) {
      case "az":
        this.filteredList.sort(function(a, b) { // Sort by data-filtered
          return a.dataset.filtered == b.dataset.filtered ? 0 : (a.dataset.filtered > b.dataset.filtered ? 1 : -1);
        });
        break;
      case "shuffle":
        this.filteredList.sort(function(a, b) { // Sort randomly
          var random = Math.floor(Math.random()*199) - 99;
          return random;
        });
        break;
      default:
        var type = this.options.type;
        this.filteredList.sort(function(a, b) { // Sort by any data type
          return a.dataset[type] == b.dataset[type] ? 0 : (a.dataset[type] > b.dataset[type] ? 1 : -1);
        });
    }

    if (direction === "desc") { // Reverse if "desc"
      this.filteredList.reverse();
    }
  }

  function rebuildNodeList(newList, oldList) {
    for (var i in oldList) {
      if (typeof oldList[i] === "object") { // If oldList[i] is a Node
        newList.push(oldList[i]); // Add to newList array
      }
    }
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