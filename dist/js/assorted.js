(function () {
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

(function () {
  'use strict';

  window.Assorted = function (options) {

    var defaults$$1 = {
      selector: '.sort-me',
      type: "az",
      direction: "asc"
    };

    // Create options by extending defaults with the passed in arugments
    if (options && (typeof options === 'undefined' ? 'undefined' : _typeof(options)) === "object") {
      this.options = extendDefaults(defaults$$1, options);
    } else {
      this.options = defaults$$1;
    }

    this.list = document.querySelector(this.options.selector);
    this.listItems = this.list.children;
    this.assortedList = [];
    this.sandbox = document.createDocumentFragment();
  };

  Assorted.prototype.filter = function (filterBy, newDirection) {
    var filter = filterBy ? filterBy : this.options.type,
        direction = newDirection ? newDirection : this.options.direction;

    rebuildNodeList(this.assortedList, this.listItems); // Rebuild this.listItems as this.assortedList
    this.sort(filter, direction);

    for (var i = 0; i < this.assortedList.length; ++i) {
      this.sandbox.appendChild(this.assortedList[i]);
    }

    this.list.appendChild(this.sandbox);
  };

  Assorted.prototype.sort = function (filter, direction) {
    switch (filter) {
      case "az":
        this.assortedList.sort(function (a, b) {
          // Sort by data-assorted
          return a.dataset.assorted == b.dataset.assorted ? 0 : a.dataset.assorted > b.dataset.assorted ? 1 : -1;
        });
        break;
      case "shuffle":
        this.assortedList.sort(function (a, b) {
          // Sort randomly
          var random = Math.floor(Math.random() * 199) - 99;
          return random;
        });
        break;
      default:
        var type = this.options.type;
        this.assortedList.sort(function (a, b) {
          // Sort by any data type
          return a.dataset[type] == b.dataset[type] ? 0 : a.dataset[type] > b.dataset[type] ? 1 : -1;
        });
    }

    if (direction === "desc") {
      // Reverse if "desc"
      this.assortedList.reverse();
    }
  };

  function rebuildNodeList(newList, oldList) {
    for (var i in oldList) {
      if (_typeof(oldList[i]) === "object") {
        // If oldList[i] is a Node
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
})();

}());
