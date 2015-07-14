'use strict';

var _ = require('lodash');
var Interments = require('./interments.model');

// Get list of intermentss
exports.index = function(req, res) {
  Interments.find(function (err, intermentss) {
    if(err) { return handleError(res, err); }
    return res.json(200, intermentss);
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