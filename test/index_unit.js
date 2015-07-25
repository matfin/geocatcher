'use strict';

var chai = require('chai'),
		should = chai.should(),
		expect = chai.expect,
		geocatcher = require('../index'),
		haversineDistance = geocatcher.haversineDistance;

describe('#haversineDistance', function() {

	it('should calculate the correct distance given some coordinates', function() {

		var source_coordinate = {lat: 53.339370, lng: -6.257496},
		test_coordinates = [
			{lat: 53.375900, lng: -6.096441}, //11.43km Dublin
			{lat: 53.263588, lng: -9.069186}, //187.01km Galway
			{lat: 52.535452, lng: 13.430555}, //1318.22km Berlin
			{lat: 51.849510, lng: -10.335312}, //321.35km Kerry 
			{lat: 37.765129, lng: -122.418428} //8178.41km San Francisco
		];

		expect(haversineDistance(source_coordinate, test_coordinates[0])).to.be.within(11.43, 11.44);
		expect(haversineDistance(source_coordinate, test_coordinates[1])).to.be.within(187.01, 187.02);
		expect(haversineDistance(source_coordinate, test_coordinates[2])).to.be.within(1318.2, 1318.25);
		expect(haversineDistance(source_coordinate, test_coordinates[3])).to.be.within(321.3, 321.35);
		expect(haversineDistance(source_coordinate, test_coordinates[4])).to.be.within(8178.4, 8718.43);

	});

});

// describe('#filterByDistance', function() {

// 	it('returns the correct filtered items given a collection of items and a distance', function() {
// 		filterByDistance().should.equal(true);
// 	});

// });




