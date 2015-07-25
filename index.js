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

		var options = {

		};

		return 'working!';
	},

	/**
	 *	Calculate distance given a coordinate relative to another
	 *
	 *	@param {Object} source_coord - the source coordinate 
	 *	@param {Object} dest_coord - given coordinate to calculate against
	 *	@return {Number} - the calculated distance
	 */
	calculate: function(source_coord, dest_coord) {
		debugger;

		source_coord = {lat: 53.348069, lng: -6.259360};
		dest_coord = {lat: 54.602362, lng: -5.918710};

		var earth_radius = 6371,
				sin_source_lat = Math.sin(source_coord.lat),
				sin_dest_lat = Math.sin(dest_coord.lat),
				cos_source_lat = Math.cos(source_coord.lat),
				cos_dest_lat = Math.cos(dest_coord.lat),
				cos_diff_lng = Math.cos(Math.abs(source_coord.lng - dest_coord.lng)),
				degrees = Math.acos((sin_source_lat * sin_dest_lat) + (cos_source_lat * cos_dest_lat * cos_diff_lng)),
				radians = degrees * (Math.PI / 180);

		return earth_radius * radians;
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