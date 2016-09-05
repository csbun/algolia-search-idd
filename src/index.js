// import DEFAULT_TPL from './tpl.html';
// import ejs from 'silly-ejs';
const ejs = require('silly-ejs');
const DEFAULT_TPL = require('./tpl.html');

const $dropdown = $('<div>').css({
  position: 'absolute',
  zIndex: 999,
});

function templateDropdown(data, template) {
  $dropdown.html(ejs(template || DEFAULT_TPL, data));
}

function showDropdown($el) {
  let top = $el.offsetHeight;
  let right = $el.offsetRight;
  let $parent = $el;
  while ($parent && $parent.tagName !== 'BODY') {
    top += $parent.offsetTop;
    right += $parent.offsetLeft;
    $parent = $parent.offsetParent;
  }
  $dropdown.css({
    top,
    right,
  }).show();
}

module.exports = function (selector, template) {
  $(selector).on('keyup', function(e) {
    const $el = $(e.currentTarget);
    const val = $el.val();
    if (val.length > 0) {
      algoliaSearchIndex.search($el.val(), function (err, content) {
        // console.log(err, content);
        // console.log(content.hits.map(hit => hit.title));
        templateDropdown(content, template);
        showDropdown($el);
      });
    } else {
      $dropdown.hide();
    }
  });
  $(document.body).append($dropdown.hide());
};
