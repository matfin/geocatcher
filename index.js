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
	 *	@param {Object} source_coord - the source coordinate which should take the form {lat: 44.55555, lng: -5.33322}
	 *	@param {Object} dest_coord - given coordinate to calculate against
	 *	@return {Number} - the calculated distance
	 */
	calculateDistance: function(source_coord, dest_coord) {
		var earth_radius = 6371,
				sin_source_lat = Math.sin(source_coord.lat),
				sin_dest_lat = Math.sin(dest_coord.lat),
				cos_source_lat = Math.cos(source_coord.lat),
				cos_dest_lat = Math.cos(dest_coord.lat),
				cos_diff_lng = Math.cos(Math.abs(source_coord.lng - dest_coord.lng)),
				sin_diff_lng = Math.sin(Math.abs(source_coord.lng - dest_coord.lng)),

		 		f1 = Math.pow(cos_dest_lat * sin_diff_lng, 2),
				f2 = Math.pow((cos_source_lat * sin_dest_lat) - (sin_source_lat * cos_dest_lat * cos_diff_lng), 2),
				f3 = (sin_source_lat * sin_dest_lat),
				f4 = (cos_source_lat * cos_dest_lat * cos_diff_lng),
				degrees = Math.atan2(Math.sqrt(f1 + f2), f3 + f4),

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