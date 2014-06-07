
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
 * Remove unusable in Seraph waterline options
 * Also converts Waterline's schema types to Seraph's schema type
 * @param {Object} waterlineSchema The original waterline schema
 * @return {Object} The Seraph compatible schema
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

/**
 * Standardizes nodes stored in neo4j (whose attribute may have been affected by Seraph pipeline)
 * for them to match the usual waterline results
 *
 * @param {Array} nodes The nodes to standardize freshly acquired using seraph-model
 * @param {Object} schema The waterline model for this collection
 * @return {Array} the waterline standardized nodes
 * @api public
 */

exports.neo4jToWaterline = function neo4jToWaterline(nodes, schema) {
  _.forEach(nodes, function(node) {
    _.forEach(node, function(field, key) {
      if (schema.hasOwnProperty(key) && schema[key].hasOwnProperty('type')) {
        switch(schema[key].type) {
          case 'date':
          case 'time':
          case 'datetime':
            var date = new Date(node[key]);
            node[key] = (date.toString() === 'Invalid Date') ? node[key] : date;
            break;
        }
      }
    });
  });
}