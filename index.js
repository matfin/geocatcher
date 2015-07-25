'use strict';

/**
 *	Fetch the data from an endpoint given the URI
 *	and execute a callback on success or failure
 *
 *	@param {String} uri - endpoint uri
 *	@param {String} cb 	- callback function to execute
 */
var fetch = function(uri, cb) {
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
};

/**
 *	Calculate distance using Haversine formula with two coordinates
 *
 *	@param {Object} source_coord - the source coordinate which should take the form {lat: 44.55555, lng: -5.33322}
 *	@param {Object} dest_coord - given coordinate to calculate against
 *	@return {Number} - the calculated distance in km
 */
var haversineDistance = function(source_coord, dest_coord) {

	if(Number.prototype.toRadians === undefined) {
		Number.prototype.toRadians = function() {
			return this * Math.PI / 180;
		}
	}

	var earth_radius = 6371,
			source_lat_radians = source_coord.lat.toRadians(),
			dest_lat_radians = dest_coord.lat.toRadians(),
			lat_diff_radians = (dest_coord.lat - source_coord.lat).toRadians(),
			lng_diff_radians = (dest_coord.lng - source_coord.lng).toRadians();

	var formula = Math.sin(lat_diff_radians / 2) * Math.sin(lat_diff_radians / 2) +
								Math.cos(source_lat_radians) * Math.cos(dest_lat_radians) *
								Math.sin(lng_diff_radians / 2) * Math.sin(lng_diff_radians / 2),
			ataned = 	2 * Math.atan2(Math.sqrt(formula), Math.sqrt(1 - formula));

	return earth_radius * ataned;
};

/**
 *	Filter the fetched data by their distance
 *
 *	@param {Array} items - the fetched items from the json endpoint 
 *	@param {Object} source_location - the reference location used to measure distance
 *	@param {Number} within_distance - the given distance (in KM) to filter by
 *	@return {Array} - the items filtered by distance
 */
var filterWithinDistance = function(items, source_location, within_distance) {
	return items.filter(function(item) {
		if(typeof item.latitude === 'undefined' || typeof item.longitude === 'undefined') {
			return;
		}
		return haversineDistance(source_location, {lat: item.latitude, lng: item.longitude}) <= within_distance;
	});
};

/**
 *	Order and map a collection
 *	@param {Array} source - the unmapped and unsorted array
 *	@return {Array} dest - the mapped and sorted array
 */
var sortAndMap = function(source) {
	return source.sort(function(a, b){
		return a.user_id > b.user_id;		
	}).map(function(item) {
		return {
			name: item.name,
			user_id: item.user_id
		};
	});
};

module.exports = {
	fetch: fetch,
	haversineDistance: haversineDistance,
	filterWithinDistance: filterWithinDistance,
	sortAndMap: sortAndMap
};

// runWith: function(cb) {
// 	var url = 'https://gist.githubusercontent.com/antidis/c4d7dd067ab47cce5856/raw/7b31c00ee9d52bf817de0708dabad3e5eb62f8ad/locations.json';

// 	module.exports.fetch(url, function(res) {
// 		var filtered = module.exports.filterWithinDistance(res, {lat: 53.3381985, lng: -6.2592576}, 30);

// 		console.log(module.exports.sortAndMap(filtered));		
// 	});
// }

