/**
 * Module dependencies
 */

var _ = require('lodash');
var validator = require('validator');
var geojsonhint = require('geojsonhint');

/**
 * Type rules
 */

module.exports = {

  'empty'   : _.isEmpty,

  'required'  : function (x, y) {
    if (y) {
    // Transform data to work properly with node validator
      if(!x && x !== 0 && x !== false) x = '';
      else if(typeof x.toString !== 'undefined') x = x.toString();
      else x = '' + x;

      return !validator.isNull(x);
    } else {
      return true;
    }
  },

  'protected' : function () {return true;},

  'notEmpty'  : function (x) {

    // Transform data to work properly with node validator
    if (!x) x = '';
    else if (typeof x.toString !== 'undefined') x = x.toString();
    else x = '' + x;

    return !validator.isNull(x);
  },

  'undefined' : _.isUndefined,

  'object'  : _.isObject,
  'json'    : function (x) {
    if (_.isUndefined(x)) return false;
    try { JSON.stringify(x); }
    catch(err) { return false; }
    return true;
  },
  'geojson' : function (value, opt) {
    var errors = geojsonhint.hint(value);
    return errors.length === 0 || !opt;
  },
  'geometry': function (value) {
    return _.isEmpty(value) || (_.isObject(value) || _.isString(value))
  },
  'mediumtext'  : _.isString,
  'longtext'  : _.isString,
  'text'    : _.isString,
  'string'  : _.isString,
  'alpha'   : validator.isAlpha,
  'alphadashed': function (x) {return (/^[a-zA-Z-_]*$/).test(x); },
  'numeric' : validator.isNumeric,
  'alphanumeric': validator.isAlphanumeric,
  'alphanumericdashed': function (x) {return (/^[a-zA-Z0-9-_]*$/).test(x); },
  'email'   : validator.isEmail,
  'url'   : function(x, opt) { return validator.isURL(x, opt === true ? undefined : opt); },
  'urlish'  : /^\s([^\/]+\.)+.+\s*$/g,
  'ip'      : validator.isIP,
  'ipv4'    : validator.isIPv4,
  'ipv6'    : validator.isIPv6,
  'creditcard': validator.isCreditCard,
  'uuid'    : validator.isUUID,
  'uuidv3'  : function (x){ return validator.isUUID(x, 3);},
  'uuidv4'  : function (x){ return validator.isUUID(x, 4);},

  'int'     : validator.isInt,
  'integer' : validator.isInt,
  'number'  : _.isNumber,
  'finite'  : _.isFinite,

  'decimal' : validator.isFloat,
  'float'   : validator.isFloat,

  'falsey'  : function (x) { return !x; },
  'truthy'  : function (x) { return !!x; },
  'null'    : _.isNull,
  'notNull' : function (x) { return !validator.isNull(x); },

  'boolean' : _.isBoolean,

  'array'   : _.isArray,

  'binary'  : function (x) { return Buffer.isBuffer(x) || _.isString(x); },

  'date'    : validator.isDate,
  'datetime': validator.isDate,

  'hexadecimal': validator.isHexadecimal,
  'hexColor': validator.isHexColor,

  'lowercase': validator.isLowercase,
  'uppercase': validator.isUppercase,

  // Miscellaneous rules
  'after'   : validator.isAfter,
  'before'  : validator.isBefore,

  'equals'  : validator.equals,
  'contains': validator.contains,
  'notContains': function (x, str) { return !validator.contains(x, str); },
  'len'     : function (x, min, max) { return validator.isLength(x, min, max); },
  'in'      : validator.isIn,
  'notIn'   : function (x, arrayOrString) { return !validator.isIn(x, arrayOrString); },
  'max'     : function (x, val) {
    var number = parseFloat(x);
    return isNaN(number) || number <= val;
  },
  'min'     : function (x, val) {
    var number = parseFloat(x);
    return isNaN(number) || number >= val;
  },
  'greaterThan' : function (x, val) {
    var number = parseFloat(x);
    return isNaN(number) || number > val;
  },
  'lessThan' : function (x, val) {
    var number = parseFloat(x);
    return isNaN(number) || number < val;
  },
  'minLength' : function (x, min) { return validator.isLength(x, min); },
  'maxLength' : function (x, max) { return validator.isLength(x, 0, max); },

  'regex' : function (x, regex) { return validator.matches(x, regex); },
  'notRegex' : function (x, regex) { return !validator.matches(x, regex); }

};
