'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var IntermentsSchema = new Schema({
  type: {type: String, default: "Feature"},
  properties: {
    interment_num: {type: String, required: true},
    section: {type: String, required: true},
    lot: {type: String, required: true},
    grave_num: {type: Number, required: true},
    type: {type: String, required: true},
    first_name: {type: String},
    middle_name: {type: String},
    last_name: {type: String},
    title: { type: String},
    military: {type: String},
    url_photo: {type: String},
    dob: {type: Date},
    dod: {type: Date},
    notes: { type: String}
  },
  geometry: {
       type     : { type: String, default: "Point" },
       coordinates: { type: [Number], index: '2dsphere'}
  }
});

module.exports = mongoose.model('Interments', IntermentsSchema);
