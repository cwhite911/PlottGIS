'use strict';

var _ = require('lodash');
var Interments = require('./interments.model');
var geojsonvt = require('geojson-vt');
var fs = require('fs');
var Readable = require('stream').Readable;

// Get list of interments
exports.index = function(req, res) {
  Interments.find(function (err, interments) {
    if(err) { return handleError(res, err); }
    var geoJSON = {
      "type": "FeatureCollection",
      "features": interments
    }
    return res.json(200, geoJSON);
  });
};

// Gets 5 nearest interments
exports.near = function(req, res) {
  var point = JSON.parse(req.query.geojson);
  Interments.geoNear(point, { maxDistance : 1, spherical : true, uniqueDocs: true, limit: 5 ,distanceMultiplier: 20900000}, function (err, interments, stats) {
      if(err) { return handleError(res, err); }
      if(!interments) { return res.send(404); }
      //Remove source interment
      if (Array.isArray(interments) && interments.length > 0){
        // interments[0].dis === 0 ? interments.shift() : interments;
        interments.shift();
      }
      return res.json(200, interments);
  });
};

// Get a single interments
exports.show = function(req, res) {
  Interments.findById(req.params.id, function (err, interments) {
    if(err) { return handleError(res, err); }
    if(!interments) { return res.send(404); }
    return res.json(interments);
  });
};

// Creates a new interments in the DB.
exports.create = function(req, res) {
  Interments.create(req.body, function(err, interments) {
    if(err) { return handleError(res, err); }
    return res.json(201, interments);
  });
};

// Updates an existing interments in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Interments.findById(req.params.id, function (err, interments) {
    if (err) { return handleError(res, err); }
    if(!interments) { return res.send(404); }
    var updated = _.merge(interments, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, interments);
    });
  });
};

// Deletes a interments from the DB.
exports.destroy = function(req, res) {
  Interments.findById(req.params.id, function (err, interments) {
    if(err) { return handleError(res, err); }
    if(!interments) { return res.send(404); }
    interments.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
