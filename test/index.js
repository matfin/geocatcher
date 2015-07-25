'use strict';

var should = require('chai').should(),
		geocatcher = require('../index'),
		fetch = geocatcher.fetch,
		calculate = geocatcher.calculate,
		filterByDistance = geocatcher.filterByDistance;

describe('#calculate', function() {

	it('returns the correct distance given a source and desintaion coordainte', function() {
		calculate({lat: 2}).should.equal(4);
	});

});

describe('#filterByDistance', function() {

	it('returns the correct filtered items given a collection of items and a distance', function() {
		filterByDistance().should.equal(true);
	});

});




