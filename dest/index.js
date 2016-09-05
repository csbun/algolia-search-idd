(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.algoliaSearchIDD = factory());
}(this, (function () { 'use strict';

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
};

(function (root, factory) {
    'use strict';
    /* istanbul ignore else  */

    if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
        // CommonJS
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        // AMD
        define(function () {
            return factory();
        });
    } else {
        // Global Variables
        root.sillyEjs = factory();
    }
})(undefined, function () {
    'use strict';

    function ejs(str, data) {
        var delimiters = ejs.delimiters.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&'),
            reg = new RegExp('<' + delimiters + '([=-]?)([\\s\\S]+?)' + delimiters + '>', 'g');
        var func = new Function('_data', 'var __tpl="";with(_data){__tpl+="' + // 用 `""` 包裹字符串
        str.replace(/\\/g, '\\\\') // 字符串中的 `\` 要改成 `\\`
        .replace(/"/g, '\\"') // 字符串中的 `"` 要改成 `\"`
        .replace(/[\r\n\t]/g, ' ') // 去除字符串中的换行 TODO: 可能会去除掉代码内的这些内容，同时 <code> 内的也会被去到
        .replace(reg, function (match, display, code) {
            // 代码部分不在字符串内，不需要 `\"` 和 `\\`
            var translatedCode = code.replace(/\\"/g, '"').replace(/\\\\/g, '\\');
            if (display === '=') {
                // 显示数据：先转换成 string，再替换 < > 防止 XSS
                return '"+(""+' + translatedCode + ').replace(/</g, "&lt;").replace(/>/g, "&gt;")+"';
            } else if (display === '-') {
                // 显示 HTML 片段：先转换成 string
                return '"+(""+' + translatedCode + ')+"';
            } else {
                // 运行代码片段
                return '";' + translatedCode + '__tpl+="';
            }
        }) + '"};return __tpl;');
        return func ? func(data).replace(/\s+/g, ' ') : '';
    };

    ejs.delimiters = '%';

    return ejs;
});



var index$1 = Object.freeze({

});

var tpl = "<ul> <% for (var i = 0; i < hits.length; i++) { var hit = hits[i]; %> <li><%= hit.title %></li> <% } %> </ul> ";

var tpl$1 = Object.freeze({
	default: tpl
});

var require$$1 = ( index$1 && index$1['default'] ) || index$1;

var require$$0 = ( tpl$1 && tpl$1['default'] ) || tpl$1;

var index = createCommonjsModule(function (module) {
// import DEFAULT_TPL from './tpl.html';
// import ejs from 'silly-ejs';
var ejs = require$$1;
var DEFAULT_TPL = require$$0;

var $dropdown = $('<div>').css({
  position: 'absolute',
  zIndex: 999
});

function templateDropdown(data, template) {
  $dropdown.html(ejs(template || DEFAULT_TPL, data));
}

function showDropdown($el) {
  var top = $el.offsetHeight;
  var right = $el.offsetRight;
  var $parent = $el;
  while ($parent && $parent.tagName !== 'BODY') {
    top += $parent.offsetTop;
    right += $parent.offsetLeft;
    $parent = $parent.offsetParent;
  }
  $dropdown.css({
    top: top,
    right: right
  }).show();
}

module.exports = function (selector, template) {
  $(selector).on('keyup', function (e) {
    var $el = $(e.currentTarget);
    var val = $el.val();
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
});

return index;

})));