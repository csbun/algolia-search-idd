# algolia-search-idd
Input DropDown for Algolia

![](https://github.com/csbun/algolia-search-idd/blob/master/screenshot/screenshot.png?raw=true)

## Install

```
yarn add algolia-search-idd
```

Or use CDN(via [unpkg](https://unpkg.com))

```html
<script src="//unpkg.com/algolia-search-idd@0.1.0/dest/index.min.js"></script>
```

## Example

```js
import asidd from 'algolia-search-idd';
// or from cdn
// const asidd = window.algoliaSearchIDD;
asidd.algoliaSearchIDD({
  el: '.selector', // or DOM Element or NodeList
  applicationID: '...',
  apiKey: '...',
  indexName: '...',
  // template: '[optional] using customer EJS template string',
});
```

Or clone this repo and run

```
npm run example
```

## License

MIT
