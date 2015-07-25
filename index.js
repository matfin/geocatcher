'use strict';

module.exports = {
	/**
	 *	Fetch the data from an endpoint given the URI
	 *	and execute a callback on success or failure
	 *
	 *	@param {String} uri - endpoint uri
	 *	@param {Function} cb - callback to execute
	 *	@return {Function} execute fetch function that then runs the callback
	 */
	fetch: function(uri, cb) {
		return 'working!';
	},

	/**
	 *	Calculate distance given a coordinate relative to another
	 *
	 *	@param {Object} coord - given coordinate to calculate against
	 *	@param {Object} source - the source coordinate 
	 *	@return {Number} - the calculated distance
	 */
	calculate: function(coord, source) {
		return coord.lat * 2;
	},

	/**
	 *	Filter the fetched data by their distance
	 *
	 *	@param {Array} items - the fetched items from the json endpoint 
	 *	@param {Number} distance - the given distance to filter by
	 *	@return {Array} - the items filtered by distance
	 */
	filterByDistance: function(items, distance) {
		return true;
	}
};