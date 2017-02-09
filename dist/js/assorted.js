(function () {
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

window.Assorted = function (options) {

  var defaults$$1 = {
    selector: '.assort-me',
    type: "az",
    direction: "asc",
    loadInit: true
  };

  this.options = setOptions(options, defaults$$1);
  this.list = document.querySelector(this.options.selector);
  this.listItems = this.list.children;
  this.assortedList = [];
  this.sandbox = document.createDocumentFragment();

  if (this.options.loadInit === true) {
    this.render();
  }
};

Assorted.prototype.render = function (options) {
  this.options = setOptions(options, this.options);
  this.assortedList = rebuildNodeList(this.assortedList, this.listItems);
  this.sorter(this.options.type, this.options.direction);

  for (var i = 0; i < this.assortedList.length; ++i) {
    this.sandbox.appendChild(this.assortedList[i]);
  }

  this.list.appendChild(this.sandbox);
};

Assorted.prototype.sorter = function () {
  var _this = this;

  (function () {
    switch (_this.options.type) {
      case "az":
        _this.assortedList.sort(function (a, b) {
          // Sort by data-assorted
          return a.dataset.assorted == b.dataset.assorted ? 0 : a.dataset.assorted > b.dataset.assorted ? 1 : -1;
        });
        break;
      case "shuffle":
        _this.assortedList.sort(function (a, b) {
          // Sort randomly
          return Math.floor(Math.random() * 199) - 99;
        });
        break;
      default:
        var thisType = _this.options.type;
        _this.assortedList.sort(function (a, b) {
          // Sort by any data type
          return a.dataset[thisType] == b.dataset[thisType] ? 0 : a.dataset[thisType] > b.dataset[thisType] ? 1 : -1;
        });
    }
  })();

  if (this.options.direction === "desc") {
    // Reverse if "desc"
    this.assortedList.reverse();
  }
};

Assorted.prototype.addEvent = function (assortObj, selector, event, setting, type) {
  document.querySelector(selector).addEventListener(event, function (e) {
    e.preventDefault();
    var settings = {};
    settings[setting] = type;
    assortObj.render(settings);
  });
};

function setOptions(options, defaults$$1) {
  if (options && (typeof options === "undefined" ? "undefined" : _typeof(options)) === "object") {
    return extendDefaults(defaults$$1, options);
  } else {
    return defaults$$1;
  }
}

function rebuildNodeList(newList, oldList) {
  for (var i in oldList) {
    if (_typeof(oldList[i]) === "object") {
      // If oldList[i] is a Node
      newList.push(oldList[i]); // Add to newList array
    }
  }
  return newList;
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
