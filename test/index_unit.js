'use strict';

var chai = require('chai'),
		should = chai.should(),
		assert = chai.assert,
		expect = chai.expect,
		geocatcher = require('../index'),
		validatedCoordinates = geocatcher.validatedCoordinates,
		haversineDistance = geocatcher.haversineDistance,
		filterWithinDistance = geocatcher.filterWithinDistance,
		sortAndMap = geocatcher.sortAndMap;

describe('#validatedCoordinates', function() {

	var raw_test_coordinates = [
		{latitude: "54.133333", user_id: 24, name: "Rose Enright", longitude: "-6.433333"},
		{latitude: "55.033", user_id: 19, name: "Enid Cahill", longitude: "-8.112"},
		{latitude: "53.74452", user_id: 29, name: "Oliver Ahearn", longitude: "-7.11167"},
		{latitude: "abcde", user_id: 30, name: "Nick Enright", longitude: "-7.2875"},
		{latitude: "54.080556", user_id: 23, name: "Eoin Gallagher", longitude: "fghij"}
	],
	validated_coordinates = geocatcher.validatedCoordinates(raw_test_coordinates);

	it('should remove two invalid coordinates given a total of five with two invalid', function() {
		expect(validated_coordinates.length).to.equal(3);
	});

	it('should correctly remap the raw coordinates on validation', function() {

		validated_coordinates.forEach(function(item) {
			expect(item.lat).to.be.a('number');
			expect(item.lng).to.be.a('number');
			expect(item.user_id).to.be.a('number');
			expect(item.name).to.be.a('string');
			assert.isUndefined(item.latitude);
			assert.isUndefined(item.longitude);
		});

	});

});

describe('#haversineDistance', function() {

	it('should calculate the correct distance given some coordinates', function() {

		var source_coordinate = {lat: 53.339370, lng: -6.257496}, //Intercom Office
		test_coordinates = [
			{lat: 53.375900, lng: -6.096441}, 	//11.43km 	Dublin
			{lat: 53.263588, lng: -9.069186}, 	//187.01km 	Galway
			{lat: 52.535452, lng: 13.430555}, 	//1318.22km Berlin
			{lat: 51.849510, lng: -10.335312}, 	//321.35km 	Kerry 
			{lat: 37.765129, lng: -122.418428}, //8178.41km San Francisco
			{lat: -53.33937, lng: 173.742504} 	//20015km		Antipodean location far south of New Zealand
		];

		expect(haversineDistance(source_coordinate, test_coordinates[0])).to.be.within(11.43, 11.44);
		expect(haversineDistance(source_coordinate, test_coordinates[1])).to.be.within(187.01, 187.02);
		expect(haversineDistance(source_coordinate, test_coordinates[2])).to.be.within(1318.2, 1318.25);
		expect(haversineDistance(source_coordinate, test_coordinates[3])).to.be.within(321.3, 321.35);
		expect(haversineDistance(source_coordinate, test_coordinates[4])).to.be.within(8178.4, 8718.43);
		expect(haversineDistance(source_coordinate, test_coordinates[5])).to.be.within(20015.0, 20015.5);

	});

});

describe('#filterWithinDistance', function() {

	it('should return a collection of items only within the specified distance given coordinates', function() {

		var source_coordinate = {lat: 53.339370, lng: -6.257496}, //Intercom Office
				test_items = [
			{lat: 52.986375, user_id: 12, name: "Christina McArdle", lng: -6.043701}, 	//41km
		  {lat: 51.92893, user_id: 1, 	name: "Alice Cahill", lng: -10.27699}, 				//313km
		  {lat: 51.8856167, user_id: 2, name: "Ian McArdle", lng: -10.4240951}, 			//326km
		  {lat: 52.3191841, user_id: 3, name: "Jack Enright", lng: -8.5072391}, 			//191km
		  {lat: 53.807778, user_id: 28, name: "Charlie Halligan", lng: -7.714444}, 	//109km
		  {lat: 53.4692815, user_id: 7, name: "Frank Kehoe", lng: -9.436036}, 				//211km
		  {lat: 54.0894797, user_id: 8, name: "Eoin Ahearn", lng: -6.18671}, 				//83km
		  {lat: 53.038056, user_id: 26, name: "Stephen McArdle", lng: -7.653889} 		//99km 
		];

		expect(filterWithinDistance(test_items, source_coordinate, 50).length).to.equal(1);
		expect(filterWithinDistance(test_items, source_coordinate, 100).length).to.equal(3);
		expect(filterWithinDistance(test_items, source_coordinate, 200).length).to.equal(5);
		expect(filterWithinDistance(test_items, source_coordinate, 300).length).to.equal(6);

	}); 

});

describe('#sortAndMap', function() {

	var test_items = [
		{lat: 52.986375, user_id: 12, name: "Christina McArdle", lng: -6.043701},
	  {lat: 51.92893, user_id: 1, 	name: "Alice Cahill", lng: -10.27699},
	  {lat: 51.8856167, user_id: 2, name: "Ian McArdle", lng: -10.4240951},
	  {lat: 52.3191841, user_id: 3, name: "Jack Enright", lng: -8.5072391},
	  {lat: 53.807778, user_id: 28, name: "Charlie Halligan", lng: -7.714444} 	
	];

	it('should return a collection sorted by user_id in ascending order', function() {

		var sorted_reference_ids = [1, 2, 3, 12, 28],
				sorted_test_items = sortAndMap(test_items);

		sorted_test_items.forEach(function(item, index) {
			expect(item.user_id).to.equal(sorted_reference_ids[index]);
		});

	});

	it('should correctly map the items properties', function() {

		var sorted_test_items = sortAndMap(test_items);

		sorted_test_items.forEach(function(item) {
			expect(item.user_id).to.be.a('number');
			expect(item.name).to.be.a('string');
			assert.isUndefined(item.lat);
			assert.isUndefined(item.lng);
		});

	});

});




