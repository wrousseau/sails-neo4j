var seraph = require('seraph');

var Connection = module.exports = function Connection(config, cb) {
	var self = this;

	this.config = config || {};

	this._buildConnection(function(err, db) {
		if (err) return cb(err);

		self.db = db;

		cb(null, self);
	});
}

/////////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
/////////////////////////////////////////////////////////////////////////////////


/**
 * Create A NodeSet
 * @todo Implement or assess usefulness
 * @param {String} name
 * @param {Object} nodeset
 * @param {Function} callback
 * @api public
 */

Connection.prototype.createNodeSet = function createNodeSet(label, nodeSet, cb) {
	nodeSet.schema = {
		createdAt: { type: Date },
		updatedAt: { type: Date }
	};
	console.log(nodeSet.schema);
	cb();
};

/**
 * Drop A NodeSet
 * @todo Implement or assess usefulness
 * @param {String} name
 * @param {Function} callback
 * @api public
 */

Connection.prototype.dropNodeSet = function dropNodeSet(name, cb) {
  // This should delete all the nodes with the given label
  cb();
};

Connection.prototype._buildConnection = function _buildConnection(cb) {

  // Build A Seraph Connection String
  var server = (this.config.protocol) ? this.config.protocol : 'http://';

  // If auth is used, append it to the connection string
  if(this.config.user && this.config.password) {
    server += this.config.user + ':' + this.config.password + '@';
  }

  // Append the host and port
  server += this.config.host + ':' + this.config.port + '/';

  if(this.config.url) server = this.config.url;

  db = this.config.database ?
  	seraph({server: server, endpoint: database}) : 
  	seraph(server);

  cb(null, db);
};

/**
 * Ensure Indexes
 * @todo : Implement
 * @param {String} collection
 * @param {Array} indexes
 * @param {Function} callback
 * @api private
 */

Connection.prototype._ensureIndexes = function _ensureIndexes(nodeset, indexes, cb) {

};