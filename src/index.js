import ejs from 'silly-ejs';
import algoliasearch from 'algoliasearch/dist/algoliasearchLite';
import documentReady from './documentReady';
import './style.less';
import DEFAULT_TPL from './tpl.html';

const EVENT_TOUCHSTART = 'ontouchstart';
const EVENT_CLICK = 'click';
const CLASS_NAME = 'algolia-search-input-dropdown';

const $dropdown = document.createElement('div');
$dropdown.className = CLASS_NAME;

function templateDropdown(data, template) {
  $dropdown.innerHTML = ejs(template || DEFAULT_TPL, data);
}

function showDropdown($el) {
  const width = $el.offsetWidth;
  let top = $el.offsetHeight;
  let left = 0;
  let $parent = $el;
  while ($parent && $parent.tagName !== 'BODY') {
    top += $parent.offsetTop || 0;
    left += $parent.offsetLeft || 0;
    $parent = $parent.offsetParent;
  }
  $dropdown.style.top = `${top}px`;
  $dropdown.style.left = `${left}px`;
  $dropdown.style.width = `${width}px`;
  $dropdown.style.display = 'block';
}

function hideDropDown() {
  $dropdown.style.display = 'none';
}

function onClickDocumentBodyHideDD(e) {
  let $el = e.target;
  while ($el && $el.tagName !== 'BODY') {
    if ($el.classList.contains(CLASS_NAME)) {
      return;
    }
    $el = $el.offsetParent;
  }
  hideDropDown();
}

// append to body;
documentReady(() => {
  hideDropDown();
  document.body.appendChild($dropdown);
  document.body.addEventListener(
    EVENT_TOUCHSTART in document.body ? EVENT_TOUCHSTART : EVENT_CLICK,
    onClickDocumentBodyHideDD,
  );
});

function initElementWithAlgoliaSearch(algoliaSearchIndex, $el, template) {
  if ($el instanceof Element && $el.tagName === 'INPUT') {
    $el.addEventListener('keyup', () => {
      const val = $el.value;
      if (val.length > 0) {
        algoliaSearchIndex.search(val, (err, content) => {
          if (err) {
            /* eslint no-console: 0 */
            console.error(err);
          } else {
            // console.log(content.hits.map(hit => hit.title));
            templateDropdown(content, template);
            showDropdown($el);
          }
        });
      } else {
        hideDropDown();
      }
    });
  }
}

// export function
export default function ({
  el,
  template,
  applicationID,
  apiKey,
  indexName,
}) {
  let $els = [];
  if (el instanceof Element) {
    $els = [el];
  } else if (el instanceof NodeList) {
    $els = el;
  } else if (typeof el === 'string' && el) {
    $els = document.querySelectorAll(el);
  } else {
    throw new Error('options.el is required and should be Element, NodeList or query selector String');
  }

  const algoliaSearchClient = algoliasearch(applicationID, apiKey);
  const algoliaSearchIndex = algoliaSearchClient.initIndex(indexName);

  /* eslint no-plusplus: 0 */
  for (let i = 0; i < $els.length; i++) {
    initElementWithAlgoliaSearch(algoliaSearchIndex, $els[i], template);
  }
}
