'use strict';

var moment = require('moment');
    moment.locale('fr');
var Q = require('q');
var mongoose = require('./../config/db');
var Schema = mongoose.Schema;
var patcher = require('mongoose-json-patch');


var invoiceSchema = new Schema({
    date: { type: Date, default: Date.now },
    patient_name: String,
    patient_share: {
        value: Number,
        paid: { type: Boolean, default: false },
    },
    SECU_share: {
        value: Number,
        paid: { type: Boolean, default: false }
    },
    date_paid: Date,
    removed: { type: Boolean, default: false }
});

invoiceSchema.plugin(patcher);

invoiceSchema.virtual('total').get(function () {
    return (this.patient_share + this.SECU_share);
});

invoiceSchema.statics.getAll = function(param) {
    var deferred = Q.defer();
    let interval = _generateMouthInterval(parseInt(param.date));
    this.find({
        date: { 
            $gte: interval.gte,
            $lt: interval.lt
        },
        removed: false
    }, function(err, data) {
        if (err) return deferred.reject(err);
        else deferred.resolve(data);
    });
    return deferred.promise;
};

invoiceSchema.methods.create = function(data) {
    return this.save(data);
};

invoiceSchema.statics.setOne = function(id, data) {
    var deferred = Q.defer();

    console.log(data, 'data');
    this.findById(id, function(err, invoice) {
        console.log(err, 'err');
        if (err) return deferred.reject(err);
        invoice.patch(data, function(err) {
            if (err) return deferred.reject(err);
            else deferred.resolve();
        });
        
    });
    return deferred.promise;
};

invoiceSchema.statics.remove = function(id) {
    var deferred = Q.defer();

    this.findById(id, function(err, invoice) {
        if (err) return deferred.reject(err);
        invoice.removed = true;
        invoice.save(function(err) {
            if (err) return deferred.reject(err);
            else deferred.resolve();
        });
        
    });
    return deferred.promise;
}


function _generateMouthInterval(timestamp) {
    let gte = moment(timestamp).startOf('month').toDate();
    let lt = moment(timestamp).endOf('month').toDate();

    return { gte, lt };
}

module.exports = mongoose.model('Invoice', invoiceSchema);