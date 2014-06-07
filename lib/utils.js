
/**
 * Module Dependencies
 */

var _ = require('lodash');

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

exports.waterlineToSeraph = function waterlineToSeraph(waterlineSchema) {
  var seraphModelSchema = _.cloneDeep(waterlineSchema);
  var seraphModelAllowedKeys = ['type', 'default', 'trim', 'lowercase', 'uppercase', 'required', 'match', 'enum', 'min', 'max'];
  var waterlineToSeraphModelKeys = {'datetime': 'date', 'integer': 'number', 'float': 'number'};
  _.forEach(seraphModelSchema, function(constraints, key) {
    if (constraints.hasOwnProperty('type')) {
      var waterlineKey = constraints.type.toLowerCase();
      if (waterlineToSeraphModelKeys.hasOwnProperty(waterlineKey))
      {
        constraints.type = waterlineToSeraphModelKeys[waterlineKey];
      }
    }
    seraphModelSchema[key] = _.pick(constraints, seraphModelAllowedKeys);
  });
  return seraphModelSchema;
};