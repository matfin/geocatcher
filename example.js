'use strict';

var geo = require('./index');

/**
 *	Grab the data and run some filters 
 */
geo.fetch('https://gist.githubusercontent.com/antidis/c4d7dd067ab47cce5856/raw/7b31c00ee9d52bf817de0708dabad3e5eb62f8ad/locations.json', function(result) {

	/** 
	 *	Now that we have the result, lets filter it to people within a distance of 100km
	 */
	var distance = 100,
			source_location = {lat: 53.339370, lng: -6.257496},
			filtered_by_distance = geo.filterWithinDistance(result, source_location, distance),
			sorted_mapped = geo.sortAndMap(filtered_by_distance);


	console.log('List of users mapped to within ' + distance + ' km of the office');
	sorted_mapped.forEach(function(user) {
		console.log('User ID: ', user.user_id, 'Name: ', user.name);
	});

});