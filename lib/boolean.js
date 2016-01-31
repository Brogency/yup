'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MixedSchema = require('./mixed'),
    inherits = require('./util/_').inherits;

module.exports = BooleanSchema;

function BooleanSchema() {
  if (!(this instanceof BooleanSchema)) return new BooleanSchema();

  MixedSchema.call(this, { type: 'boolean' });

  this.transforms.push(function (value) {
    if (this.isType(value)) return value;
    return (/true|1/i.test(value)
    );
  });
}

inherits(BooleanSchema, MixedSchema, {
  _typeCheck: function _typeCheck(v) {
    return typeof v === 'boolean' || (typeof v === 'undefined' ? 'undefined' : (0, _typeof3.default)(v)) === 'object' && v instanceof Boolean;
  }
});