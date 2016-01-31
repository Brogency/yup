'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toString = Object.prototype.toString;
var isDate = function isDate(obj) {
  return toString.call(obj) === '[object Date]';
};

module.exports = function () {
  function BadSet() {
    (0, _classCallCheck3.default)(this, BadSet);

    this._array = [];
    this.length = 0;
  }

  (0, _createClass3.default)(BadSet, [{
    key: 'values',
    value: function values() {
      return this._array;
    }
  }, {
    key: 'add',
    value: function add(item) {
      if (!this.has(item)) this._array.push(item);

      this.length = this._array.length;
    }
  }, {
    key: 'delete',
    value: function _delete(item) {
      var idx = indexOf(this._array, item);
      if (idx !== -1) this._array.splice(idx, 1);

      this.length = this._array.length;
    }
  }, {
    key: 'has',
    value: function has(val) {
      return indexOf(this._array, val) !== -1;
    }
  }]);
  return BadSet;
}();

function indexOf(arr, val) {
  for (var i = 0; i < arr.length; i++) {
    var item = arr[i];
    if (item === val || isDate(item) && +val === +item) return i;
  }
  return -1;
}