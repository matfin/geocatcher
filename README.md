# geocatcher

[![Build Status](https://travis-ci.org/matfin/geocatcher.svg?branch=master)](https://travis-ci.org/matfin/geocatcher)

A simple node module to filter items within a certain distance radius given their geo coordinates. This package is more of an exercise in creating an NPM package than anything else and it has not been published to the registry.

It includes unit tests for the functions in index.js and has a .travis.yml config file for Travic CI, so tests are run automatically when changes are pushed.


## Installation

Installation is simple - just run the following on the command line:

```
$ git clone https://github.com/matfin/geocatcher.git
$ cd geocatcher/
$ npm install
```


## Testing and running

The following commands will take care of this

```
$ npm test
$ node example.js
```

## Reference

Here are some links containing information on the formulae used to calculate distances between lat/lng coordinates on a map.

- [http://www.movable-type.co.uk/scripts/latlong.html](http://www.movable-type.co.uk/scripts/latlong.html)
- [http://www.geodatasource.com/developers/javascript](http://www.geodatasource.com/developers/javascript)
- [https://en.wikipedia.org/wiki/Great-circle_distance]( https://en.wikipedia.org/wiki/Great-circle_distance)


