export default class Assorted {

  defaults: any = {
    selector: ".assort-me", // Element that contains list needing sorted
    type: "az", // Type of sorting to apply
    direction: "asc", // Direction of sorting
    autoSort: true // Apply sorting on page load
  }

  public list: Element = null;
  public listItems: HTMLCollection = null;
  public originalList: Element = null;
  public assortedList: Array<any> = [];
  public sandbox: any = null;

  constructor ( public options? ) {
    if (typeof options !== 'object') {
      this.options = {};
    } else {
      this.options = options;
    }
    this.options = this.extend(this.defaults, this.options);
    this.list = document.querySelector(this.options.selector);
    this.listItems = this.list.children;
    this.originalList = this.list;
  }

  initialize() {
    if (this.options.autoSort === true) {
      this.sorter();
    }
  }

  extend(obj, src) {
      Object.keys(src).forEach(function(key) { obj[key] = src[key]; });
      return obj;
  }

  reset() { // TODO
    // Clear all sorting .destroy()
  }

  sorter(sortBy: any = this.options.type, direction: any = this.options.direction) {
    for (let i in this.listItems) {
      if (typeof this.listItems[i] === "object") { // If this.listItems[i] is a Node
        this.assortedList.push(this.listItems[i]); // Add to newList array
      }
    }

    switch(sortBy) {
      case "az":
        this.assortedList.sort(function(a, b) { // Sort by data-assort
          return a.dataset['assort'] == b.dataset['assort'] ? 0 : (a.dataset['assort'] > b.dataset['assort'] ? 1 : -1);
        });
        break;
      case "shuffle":
        this.assortedList.sort(function(a, b) { // Sort randomly
          var random = Math.floor(Math.random()*199) - 99;
          return random;
        });
        break;
      default:
        var type = this.options.type;
        this.assortedList.sort(function(a, b) { // Sort by any data type
          return a.dataset[type] == b.dataset[type] ? 0 : (a.dataset[type] > b.dataset[type] ? 1 : -1);
        });
    }
    if (this.options.direction === "desc") {
      this.assortedList.reverse();
    }
    this.render();
  }

  sync(filter: any = this.options.type, direction: any = this.options.direction) {
    this.sorter(filter, direction);
  }

  render() {
    this.sandbox = document.createDocumentFragment();

    for (let i = 0; i < this.assortedList.length; ++i) {
      this.sandbox.appendChild(this.assortedList[i]);
    }

    this.list.appendChild(this.sandbox);
  }
}