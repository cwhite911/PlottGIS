/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Interments = require('./interments.model');

exports.register = function(socket) {
  Interments.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Interments.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('interments:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('interments:remove', doc);
}