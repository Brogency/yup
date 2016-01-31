"use strict";

var Reference = function () {
  function Reference(string) {
    babelHelpers.classCallCheck(this, Reference);

    this._deps = [];
  }

  babelHelpers.createClass(Reference, [{
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