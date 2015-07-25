'use strict';



module.exports = {
	/**
	 *	Fetch the data from an endpoint given the URI
	 *	and execute a callback on success or failure
	 *
	 *	@param {String} uri - endpoint uri
	 *	@param {String} cb 	- callback function to execute
	 */
	fetch: function(uri, cb) {
		var https = require('https');

		https.get(uri, function(res) {
			var body = '';
			res.on('data', function(chunk) {
				body += chunk;
			});
			res.on('end', function() {
				if(typeof cb === 'function') {
					cb(JSON.parse(body));
				}
			});
		});	
	},

	/**
	 *	Calculate distance given a coordinate relative to another
	 *
	 *	@param {Object} source_coord - the source coordinate which should take the form {lat: 44.55555, lng: -5.33322}
	 *	@param {Object} dest_coord - given coordinate to calculate against
	 *	@return {Number} - the calculated distance
	 */
	calculateDistance: function(source_coord, dest_coord) {
		var earth_radius_km = 6371,
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

		return earth_radius_km * radians;
	},

	/**
	 *	Filter the fetched data by their distance
	 *
	 *	@param {Array} items - the fetched items from the json endpoint 
	 *	@param {Object} source_location - the reference location used to measure distance
	 *	@param {Number} within_distance - the given distance (in KM) to filter by
	 *	@return {Array} - the items filtered by distance
	 */
	filterWithinDistance: function(items, source_location, within_distance) {
		return items.filter(function(item) {
			if(typeof item.latitude === 'undefined' || typeof item.longitude === 'undefined') {
				return;
			}
			return module.exports.calculateDistance(source_location, {lat: item.latitude, lng: item.longitude}) <= within_distance;
		});
	},

	/**
	 *	Order and map a collection
	 *	@param {Array} source - the unmapped and unsorted array
	 *	@return {Array} dest - the mapped and sorted array
	 */
	sortAndMap: function(source) {
		return source.sort(function(a, b){
			return a.user_id > b.user_id;		
		}).map(function(item) {
			return {
				name: item.name,
				user_id: item.user_id
			};
		});
	},

	runWith: function(cb) {
		var url = 'https://gist.githubusercontent.com/antidis/c4d7dd067ab47cce5856/raw/7b31c00ee9d52bf817de0708dabad3e5eb62f8ad/locations.json';

		module.exports.fetch(url, function(res) {
			var filtered = module.exports.filterWithinDistance(res, {lat: 53.3381985, lng: -6.2592576}, 30);
			
			console.log(module.exports.sortAndMap(filtered));		
		});
	}

};