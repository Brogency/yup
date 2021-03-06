'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Condition = require('./condition'),
    ValidationError = require('./validation-error'),
    getter = require('property-expr').getter,
    locale = require('../locale.js').mixed,
    _ = require('./_');

var formatError = ValidationError.formatError;

function createErrorFactory(orginalMessage, orginalPath, value, params, originalType) {
  return function createError() {
    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var _ref$path = _ref.path;
    var path = _ref$path === undefined ? orginalPath : _ref$path;
    var _ref$message = _ref.message;
    var message = _ref$message === undefined ? orginalMessage : _ref$message;
    var _ref$type = _ref.type;
    var type = _ref$type === undefined ? originalType : _ref$type;

    return new ValidationError(formatError(message, _extends({ path: path, value: value }, params)), value, path, type);
  };
}

module.exports = function createValidation(_ref2) {
  var name = _ref2.name;
  var message = _ref2.message;
  var test = _ref2.test;
  var params = _ref2.params;
  var useCallback = _ref2.useCallback;

  function validate(_ref3) {
    var value = _ref3.value;
    var path = _ref3.path;
    var parent = _ref3.state.parent;

    var rest = _objectWithoutProperties(_ref3, ['value', 'path', 'state']);

    var createError = createErrorFactory(message, path, value, params, name);
    var ctx = _extends({ path: path, parent: parent, createError: createError, type: name }, rest);

    return new Promise(function (resolve, reject) {
      !useCallback ? resolve(test.call(ctx, value)) : test.call(ctx, value, function (err, valid) {
        return err ? reject(err) : resolve(valid);
      });
    }).then(function (validOrError) {
      if (ValidationError.isError(validOrError)) throw validOrError;else if (!validOrError) throw createError();
    });
  }

  validate.test_name = name;

  return validate;
};
