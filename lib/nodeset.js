
/**
 * Module dependencies
 */

var _ = require('lodash'),
    async = require('async'),
    Node = require('./node'),
    Query = require('./query'),
    Errors = require('waterline-errors').adapter,
    model = require('seraph-model'),
    utils = require('./utils');

/**
 * Manage A Node Set
 *
 * @param {Object} definition
 * @api public
 */

var NodeSet = module.exports = function NodeSet(definition, connection) {

  // Hold Seraph Model object
  this.seraphModel = null;

  // Set a label for this node set
  this.label = '';

  // Hold Schema Information
  this.schema = null;

  // Hold a reference to an active connection
  this.connection = connection;

  // Hold Indexes
  this.indexes = [];

  // Parse the definition into node set attributes
  this._parseDefinition(definition);

  // Build an indexes dictionary
  this._buildIndexes();

  return this;
};


/////////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
/////////////////////////////////////////////////////////////////////////////////

/**
 * Find Nodes
 * @todo To Implement
 *
 * @param {Object} criteria
 * @param {Function} callback
 * @api public
 */

NodeSet.prototype.find = function find(criteria, cb) {
  var self = this,
      query;

  // Catch errors from building query and return to the callback
  try {
    query = new Query(criteria);
  } catch(err) {
    return cb(err);
  }
  var where = query.criteria.where || {};
  var queryOptions = _.omit(query.criteria, 'where');

  var callback = function(err, nodes) {
    if (err) return cb(err);
      utils.neo4jToWaterline(nodes, self.schema);
      cb(null, nodes);
  }

  if (_.isEmpty(where)) {
    this.seraphModel.findAll(queryOptions, callback);
  } else {
    this.seraphModel.where(where, queryOptions, callback);
  }
};

/**
 * Create A New Node
 *
 * @todo How should compositions (allowed by seraph-model) be handled ?
 * @param {Object|Array} values
 * @param {Function} callback
 * @api public
 */

NodeSet.prototype.create = function create(values, cb) {
  var self = this;

  // Normalize values to an array
  if(!Array.isArray(values)) values = [values];

  // Build a Node and add the values to a new array
  var nodes = values.map(function(value) {
    return new Node(value, self.schema).values;
  });

  var results = [];
  var done = _.after(nodes.length, function() {
    utils.neo4jToWaterline(results, self.schema);
    return cb(null, results);
  });

  _.forEach(nodes, function(node) {
    self.seraphModel.save(node, true, function(err, result) {
      if (err) {
        return cb(err);
      }
      results.push(result);
      done();
    });
  });
  return 

};

/**
 * Update Nodes
 *
 * @todo Implement
 * @param {Object} criteria
 * @param {Object} values
 * @param {Function} callback
 * @api public
 */

NodeSet.prototype.update = function update(criteria, values, cb) {

};

/**
 * Destroy Nodes
 *
 * @todo Implement
 * @param {Object} criteria
 * @param {Function} callback
 * @api public
 */

NodeSet.prototype.destroy = function destroy(criteria, cb) {

};


/////////////////////////////////////////////////////////////////////////////////
// PRIVATE METHODS
/////////////////////////////////////////////////////////////////////////////////


/**
 * Parse Node Set Definition
 *
 * @param {Object} definition
 * @api private
 */

NodeSet.prototype._parseDefinition = function _parseDefinition(definition) {
  var self = this,
      nodeSetDef = _.cloneDeep(definition);

  // Hold the Schema
  this.schema = nodeSetDef.definition;

  // TODO : Figure out how to handle Auto-Increment Keys, right now discarded as in Mongo adapter
  Object.keys(this.schema).forEach(function(key) {
    if(self.schema[key].autoIncrement) delete self.schema[key].autoIncrement;
  });

  // Set the label
  this.label = nodeSetDef.adapter.identity.toLowerCase();
  
  this.seraphModel = model(this.connection.db, this.label);
  
  this.seraphModel.schema = utils.waterlineToSeraph(this.schema);

};

/**
 * Build Internal Indexes Dictionary based on the current schema.
 * Right now, making a index unique should not change anything as it needs to be handled
 * in node neo4j
 * @api private
 */

NodeSet.prototype._buildIndexes = function _buildIndexes() {
  var self = this;

  Object.keys(this.schema).forEach(function(key) {
    var index = {},
        options = {};

    // Handle Unique Indexes
    if(self.schema[key].unique) {

      // Set the index sort direction, doesn't matter for single key indexes
      index[key] = 1;

      // Set the index options
      options.sparse = true;
      options.unique = true;

      // Store the index in the node set
      self.indexes.push({ index: index, options: options });
      return;
    }

    // Handle non-unique indexes
    if(self.schema[key].index) {

      // Set the index sort direction, doesn't matter for single key indexes
      index[key] = 1;

      // Set the index options
      options.sparse = true;

      // Store the index in the node set
      self.indexes.push({ index: index, options: options });
      return;
    }
  });
};