'use strict';

var chai = require('chai'),
		should = chai.should(),
		assert = chai.assert,
		expect = chai.expect,
		geocatcher = require('../index'),
		haversineDistance = geocatcher.haversineDistance,
		filterWithinDistance = geocatcher.filterWithinDistance,
		sortAndMap = geocatcher.sortAndMap;

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
			{latitude: 52.986375, user_id: 12, name: "Christina McArdle", longitude: -6.043701}, 	//41km
		  {latitude: 51.92893, user_id: 1, 	name: "Alice Cahill", longitude: -10.27699}, 				//313km
		  {latitude: 51.8856167, user_id: 2, name: "Ian McArdle", longitude: -10.4240951}, 			//326km
		  {latitude: 52.3191841, user_id: 3, name: "Jack Enright", longitude: -8.5072391}, 			//191km
		  {latitude: 53.807778, user_id: 28, name: "Charlie Halligan", longitude: -7.714444}, 	//109km
		  {latitude: 53.4692815, user_id: 7, name: "Frank Kehoe", longitude: -9.436036}, 				//211km
		  {latitude: 54.0894797, user_id: 8, name: "Eoin Ahearn", longitude: -6.18671}, 				//83km
		  {latitude: 53.038056, user_id: 26, name: "Stephen McArdle", longitude: -7.653889} 		//99km 
		];

		expect(filterWithinDistance(test_items, source_coordinate, 50).length).to.equal(1);
		expect(filterWithinDistance(test_items, source_coordinate, 100).length).to.equal(3);
		expect(filterWithinDistance(test_items, source_coordinate, 200).length).to.equal(5);
		expect(filterWithinDistance(test_items, source_coordinate, 300).length).to.equal(6);

	}); 

});

describe('#sortAndMap', function() {

	var test_items = [
		{latitude: 52.986375, user_id: 12, name: "Christina McArdle", longitude: -6.043701},
	  {latitude: 51.92893, user_id: 1, 	name: "Alice Cahill", longitude: -10.27699},
	  {latitude: 51.8856167, user_id: 2, name: "Ian McArdle", longitude: -10.4240951},
	  {latitude: 52.3191841, user_id: 3, name: "Jack Enright", longitude: -8.5072391},
	  {latitude: 53.807778, user_id: 28, name: "Charlie Halligan", longitude: -7.714444} 	
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
			assert.isUndefined(item.latitude);
			assert.isUndefined(item.longitude);
		});

	});

});




