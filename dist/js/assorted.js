var Assorted = (function () {
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var Assorted$1 = function () {
    function Assorted(options) {
        this.options = options;
        this.defaults = {
            selector: ".assort-me",
            type: "az",
            direction: "asc",
            autoSort: true // Apply sorting on page load
        };
        this.list = null;
        this.listItems = null;
        this.originalList = null;
        this.assortedList = [];
        this.sandbox = null;
        if ((typeof options === "undefined" ? "undefined" : _typeof(options)) !== 'object') {
            this.options = {};
        } else {
            this.options = options;
        }
        this.options = this.extend(this.defaults, this.options);
        this.list = document.querySelector(this.options.selector);
        this.listItems = this.list.children;
        this.originalList = this.list;
    }
    Assorted.prototype.initialize = function () {
        if (this.options.autoSort === true) {
            this.sorter();
        }
    };
    Assorted.prototype.extend = function (obj, src) {
        Object.keys(src).forEach(function (key) {
            obj[key] = src[key];
        });
        return obj;
    };
    Assorted.prototype.reset = function () {
        // Clear all sorting .destroy()
    };
    Assorted.prototype.sorter = function (sortBy, direction) {
        if (sortBy === void 0) {
            sortBy = this.options.type;
        }
        if (direction === void 0) {
            direction = this.options.direction;
        }
        for (var i in this.listItems) {
            if (_typeof(this.listItems[i]) === "object") {
                this.assortedList.push(this.listItems[i]); // Add to newList array
            }
        }
        switch (sortBy) {
            case "az":
                this.assortedList.sort(function (a, b) {
                    return a.dataset['assort'] == b.dataset['assort'] ? 0 : a.dataset['assort'] > b.dataset['assort'] ? 1 : -1;
                });
                break;
            case "shuffle":
                this.assortedList.sort(function (a, b) {
                    var random = Math.floor(Math.random() * 199) - 99;
                    return random;
                });
                break;
            default:
                var type = this.options.type;
                this.assortedList.sort(function (a, b) {
                    return a.dataset[type] == b.dataset[type] ? 0 : a.dataset[type] > b.dataset[type] ? 1 : -1;
                });
        }
        if (this.options.direction === "desc") {
            this.assortedList.reverse();
        }
        this.render();
    };
    Assorted.prototype.sync = function (filter, direction) {
        if (filter === void 0) {
            filter = this.options.type;
        }
        if (direction === void 0) {
            direction = this.options.direction;
        }
        this.sorter(filter, direction);
    };
    Assorted.prototype.render = function () {
        this.sandbox = document.createDocumentFragment();
        for (var i = 0; i < this.assortedList.length; ++i) {
            this.sandbox.appendChild(this.assortedList[i]);
        }
        this.list.appendChild(this.sandbox);
    };
    return Assorted;
}();

return Assorted$1;

}());
