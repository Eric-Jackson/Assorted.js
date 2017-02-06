(function () {
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var Filtered = function () {
    function Filtered(options) {
        this.options = options;
        this.list = document.querySelector(this.options.selector);
        this.listItems = this.list.children;
        this.filteredList = [];
        this.sandbox = document.createDocumentFragment();
        var defaults$$1 = {
            selector: '.filter-me',
            type: 'az',
            direction: 'asc'
        };
        if (options && (typeof options === 'undefined' ? 'undefined' : _typeof(options)) === "object") {
            this.options = extendDefaults(defaults$$1, options);
        } else {
            this.options = defaults$$1;
        }
    }
    Filtered.prototype.filter = function (filterBy, newDirection) {
        var filter = filterBy ? filterBy : this.options.type,
            direction = newDirection ? newDirection : this.options.direction;
        rebuildNodeList(this.filteredList, this.listItems); // Rebuild this.listItems as this.filteredList
        this.sort(filter, direction);
        for (var i = 0; i < this.filteredList.length; ++i) {
            this.sandbox.appendChild(this.filteredList[i]);
        }
        this.list.appendChild(this.sandbox);
    };
    Filtered.prototype.sort = function (filter, direction) {
        switch (filter) {
            case "az":
                this.filteredList.sort(function (a, b) {
                    return a.dataset['filtered'] == b.dataset['filtered'] ? 0 : a.dataset['filtered'] > b.dataset['filtered'] ? 1 : -1;
                });
                break;
            case "shuffle":
                this.filteredList.sort(function (a, b) {
                    var random = Math.floor(Math.random() * 199) - 99;
                    return random;
                });
                break;
            default:
                var type = this.options.type;
                this.filteredList.sort(function (a, b) {
                    return a.dataset[type] == b.dataset[type] ? 0 : a.dataset[type] > b.dataset[type] ? 1 : -1;
                });
        }
        if (direction === "desc") {
            this.filteredList.reverse();
        }
    };
    return Filtered;
}();
function rebuildNodeList(newList, oldList) {
    for (var i in oldList) {
        if (_typeof(oldList[i]) === "object") {
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
var filtered = new Filtered();

}());
