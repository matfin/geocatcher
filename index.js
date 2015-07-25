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
				var data = JSON.parse(body),
						filtered = validatedCoordinates(data);

				cb(filtered);
			}
		});
	});	
};

/**
 *	Filter coordinates to ensure they are valid - drop any that cannot have 
 *	their lat/lng converted into floats.
 *	
 *	@param {Array} unfiltered - the unfiltered coordinates coming from an endpoint
 *	@return {Array} - filtered and mapped coordinates
 */
var validatedCoordinates = function(unfiltered) {
	return unfiltered.map(function(item) {
		return {
			lat: parseFloat(item.latitude),
			lng: parseFloat(item.longitude),
			name: item.name,
			user_id: item.user_id
		};
	}).filter(function(item) {
		return !isNaN(item.lat) && !isNaN(item.lng);
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
		if(typeof item.lat === 'undefined' || typeof item.lng === 'undefined') {
			return;
		}
		return haversineDistance(source_location, {lat: item.lat, lng: item.lng}) <= within_distance;
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

