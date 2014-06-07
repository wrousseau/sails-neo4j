/*---------------------------------------------------------------
  :: sails-neo4j
  -> adapter
---------------------------------------------------------------*/

var _ = require('lodash');
var Connection = require('./connection'),
    NodeSet = require('./nodeset'),
    Errors = require('waterline-errors').adapter;

/**
 * waterline-neo4j
 *
 * Most of the methods below are optional.
 *
 * If you don't need / can't get to every method, just implement
 * what you have time for.  The other methods will only fail if
 * you try to call them!
 *
 * For many adapters, this file is all you need.  For very complex adapters, you may need more flexiblity.
 * In any case, it's probably a good idea to start with one file and refactor only if necessary.
 * If you do go that route, it's conventional in Node to create a `./lib` directory for your private submodules
 * and load them at the top of the file with other dependencies.  e.g. var update = `require('./lib/update')`;
 */
module.exports = (function () {


  // You'll want to maintain a reference to each connection
  // that gets registered with this adapter.
  var connections = {};

  var adapter = {

    // to track schema internally
    syncable: false,

    // Default configuration for connections
    defaults: {
      protocol: 'http://',
      port: 7474,
      host: 'localhost',
      url: null,
    },



    /**
     *
     * This method runs when a model is initially registered
     * at server-start-time.  This is the only required method.
     *
     * @param  {[type]}   connection [description]
     * @param  {[type]}   nodesets [description]
     * @param  {Function} cb         [description]
     * @return {[type]}              [description]
     */
    registerConnection: function(connection, nodeSets, cb) {

      var self = this;

      if(!connection.identity) return cb(Errors.IdentityMissing);
      if(connections[connection.identity]) return cb(Errors.IdentityDuplicate);

      connections[connection.identity] = {
        config: connection,
        nodeSets: {}
      };

      new Connection(connection, function(err, db) {
        if (err) return cb(err);
        connections[connection.identity].connection = db;

        Object.keys(nodeSets).forEach(function(key) {
          connections[connection.identity].nodeSets[key] = new NodeSet(nodeSets[key], db);
        })
      })

      cb();
    },


    /**
     * Fired when a model is unregistered, typically when the server
     * is killed. Useful for tearing-down remaining open connections,
     * etc.
     *
     * @param  {Function} cb [description]
     * @return {[type]}      [description]
     */
    // Teardown a Connection
    teardown: function (conenctionName, cb) {

      if(!connections[connectionName]) return cb();

      delete connections[connectionName];
      cb();
    },

    /**
     * Describe
     *
     * Return the Schema of a Node Set after first creating the Node Set
     * and indexes if they don't exist.
     *
     * Does this actually make any sense, as a label which defines a Node Set is only registered
     * when a node is created ?
     * @param {String} connectionName
     * @param {String} label
     * @param {Function} callback
     */

    describe: function(connectionName, label, cb) {

      var connectionObject = connections[connectionName];
      var nodeSet = connectionObject.nodeSets[label];
      var schema = nodeSet.schema;
      /* @todo : Mimic this Mongo call using a Cypher query
      connectionObject.connection.db.collectionNames(collectionName, function(err, names) {
        if(names.length > 0) return cb(null, schema);
        cb();
      });*/
    },

    /**
     * Drop
     *
     * Drop a Node Set (all nodes of a specified label)
     * 
     * One should note that neo4j keeps created labels internally forever
     * (without manually editing its database obviously)
     * 
     * @param {String} connectionName
     * @param {String} label
     * @param {Array} relations
     * @param {Function} callback
     */

    drop: function(connectionName, label, relations, cb) {

      if(typeof relations === 'function') {
        cb = relations;
        relations = [];
      }

      var connectionObject = connections[connectionName];
      var nodeSet = connectionObject.nodeSets[label];

      // @todo : Drop the nodeSet and indexes
      /*connectionObject.connection.dropCollection(collectionName, function(err) {

        // Don't error if droping a collection which doesn't exist
        if(err && err.errmsg === 'ns not found') return cb();
        if(err) return cb(err);
        cb();
      });*/
    },

    /**
     * Create
     *
     * Create a single node with a given label
     *
     * @param {String} connectionName
     * @param {String} label
     * @param {Object} data
     * @param {Function} callback
     */

    create: function(connectionName, label, data, cb) {
      var connectionObject = connections[connectionName];
      var nodeSet = connectionObject.nodeSets[label];

      // Create a new node with the given label
      nodeSet.create(data, function(err, results) {
        if(err) return cb(err);
        cb(null, results[0]);
      });
    },

    /**
     * Create Each
     *
     * Create an array of nodes with a given label
     *
     * @param {String} connectionName
     * @param {String} label
     * @param {Object} data
     * @param {Function} callback
     */

    createEach: function(connectionName, label, data, cb) {

      var connectionObject = connections[connectionName];
      var nodeSet = connectionObject.nodeSets[label];

      // Create a new node with the given label
      nodeSet.create(data, function(err, results) {
        if(err) return cb(err);
        cb(null, results);
      });
    },

    /**
     * Find
     *
     * Find all matching nodes with a given label.
     *
     * @param {String} connectionName
     * @param {String} label
     * @param {Object} options
     * @param {Function} callback
     */

    find: function(connectionName, label, options, cb) {
      var connectionObject = connections[connectionName];
      var nodeSet = connectionObject.nodeSets[label];

      // Find all matching documents
      nodeSet.find(options, function(err, results) {
        if(err) return cb(err);
        cb(null, results);
      });
    },

    /**
     * Update
     *
     * Update all nodes matching a criteria object with a given label.
     *
     * @param {String} connectionName
     * @param {String} label
     * @param {Object} options
     * @param {Object} values
     * @param {Function} callback
     */

    update: function(connectionName, label, options, values, cb) {

      var connectionObject = connections[connectionName];
      var nodeSet = connectionObject.nodeSets[label];

      // Update matching documents
      nodeSet.update(options, values, function(err, results) {
        if(err) return cb(err);
        cb(null, results);
      });
    },

    /**
     * Destroy
     *
     * Destroy all nodes matching a criteria object with a given label.
     *
     * @param {String} connectionName
     * @param {String} label
     * @param {Object} options
     * @param {Function} callback
     */

    destroy: function(connectionName, label, options, cb) {
      var connectionObject = connections[connectionName];
      var nodeSet = connectionObject.nodeSets[label];

      // Find matching documents
      nodeSet.find(options, function(err, results) {
        if(err) return cb(err);

        // Destroy matching documents
        nodeSet.destroy(options, function(err) {
          if(err) return cb(err);
          cb(null, results);
        });
      });
    },

    identity: 'sails-neo4j'
  };


  // Expose adapter definition
  return adapter;

})();

