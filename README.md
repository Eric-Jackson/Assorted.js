# Assorted
Vanilla JS Plugin for Sorting Everything

1) Add script to HTML and create list resembling this HTML:
```html
<script type="text/javascript" src="./dist/js/filtered.min.js" />
```

```html
<ul class="assort-me">
  <li data-assorted="Name or Number Here"></li>
  <li data-assorted="Name or Number Here"></li>
  <li data-assorted="Name or Number Here"></li>
  <li data-assorted="Name or Number Here"></li>
</ul>
```

2) Create a new instance of Assorted:
```js
var assorted = new Assorted();
```

3) Call the render method, passing arguments for assorted:
```js
assorted.render({
  type: 'az',
  direction: 'asc'
});
```