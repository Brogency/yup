'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var strReg = /\$\{\s*(\w+)\s*\}/g;

var replace = function replace(str) {
  return function (params) {
    return str.replace(strReg, function (_, key) {
      return params[key] || '';
    });
  };
};

module.exports = ValidationError;

function ValidationError(errors, value, field, type) {
  var _this = this;

  this.name = 'ValidationError';
  this.value = value;
  this.path = field;
  this.type = type;
  this.errors = [];
  this.inner = [];

  if (errors) [].concat(errors).forEach(function (err) {
    _this.errors = _this.errors.concat(err.errors || err);

    if (err.inner) _this.inner = _this.inner.concat(err.inner.length ? err.inner : err);
  });

  this.message = this.errors.length > 1 ? this.errors.length + ' errors occurred' : this.errors[0];

  if (Error.captureStackTrace) Error.captureStackTrace(this, ValidationError);
}

ValidationError.prototype = (0, _create2.default)(Error.prototype);
ValidationError.prototype.constructor = ValidationError;

ValidationError.isError = function (err) {
  return err && err.name === 'ValidationError';
};

ValidationError.formatError = function (message, params) {
  if (typeof message === 'string') message = replace(message);

  var fn = function fn(_ref) {
    var path = _ref.path;
    var params = (0, _objectWithoutProperties3.default)(_ref, ['path']);

    params.path = path || 'this';

    return message(params);
  };

  return arguments.length === 1 ? fn : fn(params);
};

ValidationError.prototype.toJSON = function () {
  if (this.inner.length) return this.inner.reduce(function (list, e) {
    list[e.path] = (list[e.path] || (list[e.path] = [])).concat(e.toJSON());
    return list;
  }, {});

  if (this.path) return (0, _defineProperty3.default)({}, this.path, { errors: this.errors, path: this.path, type: this.type });

  return err.errors;
};