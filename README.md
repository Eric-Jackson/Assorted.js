# Filtered
Vanilla JS Plugin for Sorting Everything

1) Create list resembling this HTML:
```html
<ul class="filter-me">
  <li data-filtered="Name or Number Here"></li>
  <li data-filtered="Name or Number Here"></li>
  <li data-filtered="Name or Number Here"></li>
  <li data-filtered="Name or Number Here"></li>
</ul>
```

2) Create a new instance of Filtered:
```js
var filtered = new Filtered();
```

3) Call the filter method, passing arguments for type or direction:
```js
filtered.filter('az', 'asc');
```
