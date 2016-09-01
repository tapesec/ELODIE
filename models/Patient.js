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

invoiceSchema.set('toObject', { getters: true, virtuals: true  });
invoiceSchema.set('toJSON', {
   virtuals: true
});

invoiceSchema.virtual('total_line').get(function () {
    
    return this.patient_share.value + this.SECU_share.value;
});

invoiceSchema.virtual('total_line_paid').get(function () {
    
    let total = 0;
    if (this.patient_share.paid) total += this.patient_share.value;
    if (this.SECU_share.paid) total+= this.SECU_share.value;

    return total;
});

invoiceSchema.statics.getAll = function(param) {
    var deferred = Q.defer();
    let QueryBuilder = this.find({ removed: false });
    
    // paramètres du mois (timestamp) ..
    if (param.date) {
        let interval = _generateMouthInterval(parseInt(param.date));
        QueryBuilder.where({
            date: { 
                $gte: interval.gte,
                $lt: interval.lt
            }
        });
    }
    
    QueryBuilder.exec(function(err, data) {
        if (err) return deferred.reject(err);
        else deferred.resolve(data);
    });

    return deferred.promise;
};

/***
* @description retourne le total de chaque colonne de la facturation
*/
invoiceSchema.statics.getTotalsInvoices = function(invoicesLines) {
    
    var total_SECU_share = 0
    ,   total_patient_share = 0
    ,   total_global_no_paid = 0
    ,   total_global_paid = 0;

    invoicesLines.forEach(function(line) {
        
        total_SECU_share += line.SECU_share.value;
        total_patient_share += line.patient_share.value;
        
        if (line.SECU_share.paid) total_global_paid += line.SECU_share.value;
        else total_global_no_paid += line.SECU_share.value;

        if (line.patient_share.paid) total_global_paid += line.patient_share.value;
        else total_global_no_paid += line.patient_share.value;

    });

    return { 
        total_SECU_share: total_SECU_share.toFixed(2), 
        total_patient_share: total_patient_share.toFixed(2), 
        total_global_no_paid: total_global_no_paid.toFixed(2), 
        total_global_paid: total_global_paid.toFixed(2) 
    };
}

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