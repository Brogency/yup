"use strict";

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Reference = function () {
  function Reference(string) {
    (0, _classCallCheck3.default)(this, Reference);

    this._deps = [];
  }

  (0, _createClass3.default)(Reference, [{
    key: "default",
    value: function _default() {}
  }, {
    key: "cast",
    value: function cast(value, parent, options) {
      return parent.default(undefined).cast(value, options);
    }
  }]);
  return Reference;
}();