
/**
 * Module Dependencies
 */

var _ = require('lodash'),
    utils = require('./utils'),
    hasOwnProperty = utils.object.hasOwnProperty;

/**
 * Node
 *
 * Represents a single node in a node set (group of nodes sharing a label). Responsible for serializing values before
 * writing to a node set.
 *
 * @param {Object} values
 * @param {Object} schema
 * @api private
 */

var Node = module.exports = function Node(values, schema) {

  // Keep track of the current node's values
  this.values = {};

  // Grab the schema for normalizing values
  this.schema = schema || {};

  // If values were passed in, use the setter
  if(values) this.values = this.setValues(values);

  return this;
};


/////////////////////////////////////////////////////////////////////////////////
// PRIVATE METHODS
/////////////////////////////////////////////////////////////////////////////////


/**
 * Set values
 *
 * Normalizes values into proper formats.
 *
 * @param {Object} values
 * @return {Object}
 * @api private
 */

Node.prototype.setValues = function setValues(values) {
  this.serializeValues(values);
  return values;
};

/**
 * Serialize Insert Values
 *
 * @param {Object} values
 * @return {Object}
 * @api private
 */

Node.prototype.serializeValues = function serializeValues(values) {
  var self = this;

  Object.keys(values).forEach(function(key) {
    if(!hasOwnProperty(self.schema, key)) return;

    var type = self.schema[key].type,
        val;

    if(type === 'json') {
      try {
        val = JSON.parse(values[key]);
      } catch(e) {
        return;
      }
      values[key] = val;
    }
  });

  return values;
};