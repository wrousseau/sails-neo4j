
/**
 * Module Dependencies
 */

 var _ = require('lodash'),
     url = require('url');

/**
 * ignore
 */

exports.object = {};

/**
 * Safer helper for hasOwnProperty checks
 *
 * @param {Object} obj
 * @param {String} prop
 * @return {Boolean}
 * @api public
 */

var hop = Object.prototype.hasOwnProperty;
exports.object.hasOwnProperty = function(obj, prop) {
  return hop.call(obj, prop);
};

/**
 * Normalize id where attribute for Cypher Queries
 * @todo : Implement
 * @param {Array} models
 * @api public
 */

exports.rewriteIds = function rewriteIds(models) {
  return models;
};

/**
 * Case Insensitive
 *
 * Wrap a value in a case insensitive regex
 * /^foobar$/i
 * 
 *
 * NOTE: this is really bad for production currently,
 * when you use a regex in the query it won't hit any
 * indexes. We need to fix this ASAP but for now it passes
 * all the waterline tests.
 *
 * @todo : Adapt to Neo4j
 * @param {String} val
 * @return {String}
 * @api public
 */

exports.caseInsensitive = function caseInsensitive(val) {
  if(!_.isString(val)) return val;
  return val.replace(/[-[\]{}()+?*.\/,\\^$|#]/g, "\\$&");
};

/**
 * Parse URL string from config
 *
 * Parse URL string into connection config parameters
 *
 * @param {Object} config
 * @return {Object}
 * @api public
 */

exports.parseUrl = function parseUrl(config) {
  if(!_.isString(config.url)) return config;

  var obj = url.parse(config.url);

  config.host = obj.hostname || config.host;
  config.port = obj.port || config.port;

  if(_.isString(obj.auth)) {
    config.user = obj.auth.split(":")[0] || config.user;
    config.password = obj.auth.split(":")[1] || config.password;
  }

  return config;
};