'use strict';

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _getOwnPropertyNames = require('babel-runtime/core-js/object/get-own-property-names');

var _getOwnPropertyNames2 = _interopRequireDefault(_getOwnPropertyNames);

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright (c) 2011-2014, Walmart and other contributors.
// Copyright (c) 2011, Yahoo Inc.
// All rights reserved. https://github.com/hapijs/hoek/blob/master/LICENSE

var isSchema = function isSchema(schema) {
  return schema && !!schema.__isYupSchema__;
};

module.exports = function clone(obj, seen) {
  var isFirst = !seen,
      isImmutable = isSchema(obj) && !isFirst;

  if ((typeof obj === 'undefined' ? 'undefined' : (0, _typeof3.default)(obj)) !== 'object' || obj === null || isImmutable) return obj;

  // if (global.REPORT_CLONE && isFirst)
  //   throw new Error() //console.log('clone')

  seen = seen || { orig: [], copy: [] };

  var lookup = seen.orig.indexOf(obj);

  if (lookup !== -1) return seen.copy[lookup];

  var newObj;
  var cloneDeep = false;

  if (!Array.isArray(obj)) {
    if (obj instanceof Date) {
      newObj = new Date(obj.getTime());
    } else if (obj instanceof RegExp) {
      newObj = new RegExp(obj);
    } else {
      var proto = (0, _getPrototypeOf2.default)(obj);

      if (proto !== null && !proto) {
        newObj = obj;
      } else {
        newObj = (0, _create2.default)(proto);
        cloneDeep = true;
      }
    }
  } else {
    newObj = [];
    cloneDeep = true;
  }

  seen.orig.push(obj);
  seen.copy.push(newObj);

  if (cloneDeep) {
    var keys = (0, _getOwnPropertyNames2.default)(obj);

    for (var i = 0, il = keys.length; i < il; ++i) {
      var key = keys[i];

      var descriptor = (0, _getOwnPropertyDescriptor2.default)(obj, key);

      if (descriptor.get || descriptor.set) {
        (0, _defineProperty2.default)(newObj, key, descriptor);
      } else {
        newObj[key] = clone(obj[key], seen);
      }
    }
  }

  return newObj;
};