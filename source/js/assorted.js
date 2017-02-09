window.Assorted = function(options) {

  const defaults = {
    selector: '.assort-me',
    type: "az",
    direction: "asc",
    loadInit: true
  }

  this.options = setOptions(options, defaults);
  this.list = document.querySelector(this.options.selector);
  this.listItems = this.list.children;
  this.assortedList = [];
  this.sandbox = document.createDocumentFragment();

  if (this.options.loadInit === true) {
    this.render();
  }

}

Assorted.prototype.render = function(options) {
  this.options = setOptions(options, this.options);
  this.assortedList = rebuildNodeList(this.assortedList, this.listItems);
  this.sorter(this.options.type, this.options.direction);

  for (let i = 0; i < this.assortedList.length; ++i) {
    this.sandbox.appendChild(this.assortedList[i]);
  };

  this.list.appendChild(this.sandbox);
}

Assorted.prototype.sorter = function() {
  switch(this.options.type) {
    case "az":
      this.assortedList.sort(function(a, b) { // Sort by data-assorted
        return a.dataset.assorted == b.dataset.assorted ? 0 : (a.dataset.assorted > b.dataset.assorted ? 1 : -1);
      });
      break;
    case "shuffle":
      this.assortedList.sort(function(a, b) { // Sort randomly
        return Math.floor(Math.random()*199) - 99;
      });
      break;
    default:
      const thisType = this.options.type;
      this.assortedList.sort(function(a, b) { // Sort by any data type
        return a.dataset[thisType] == b.dataset[thisType] ? 0 : (a.dataset[thisType] > b.dataset[thisType] ? 1 : -1);
      });
  }

  if (this.options.direction === "desc") { // Reverse if "desc"
    this.assortedList.reverse();
  }
}

function setOptions(options, defaults) {
  if (options && typeof options === "object") {
    return extendDefaults(defaults, options);
  } else {
    return defaults;
  }
}

function rebuildNodeList(newList, oldList) {
  for (let i in oldList) {
    if (typeof oldList[i] === "object") { // If oldList[i] is a Node
      newList.push(oldList[i]); // Add to newList array
    }
  }
  return newList;
}

// Utility method to extend defaults with user options
function extendDefaults(source, properties) {
  for (let property in properties) {
    if (properties.hasOwnProperty(property)) {
      source[property] = properties[property];
    }
  }
  return source;
}