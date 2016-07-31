'use strict';

var mongoose = require('./../config/db');
var Schema = mongoose.Schema;

var invoiceSchema = new Schema({
  date: { type: Date, default: Date.now },
  patient_name: String,
  patient_share: Number,
  SECU_share: Number,
  paid: Boolean,
  date_paid: Date,
  removed: Boolean
});

invoiceSchema.virtual('total').get(function () {
  return (this.patient_share + this.SECU_share);
});

invoiceSchema.statics.getAll = function() {
  return this.find();
};

invoiceSchema.methods.create = function(data) {
  console.log(data, 'data');
  return this.save(data);
};

invoiceSchema.statics.setOne = function(data) {
  return this.find();
};

module.exports = mongoose.model('Invoice', invoiceSchema);