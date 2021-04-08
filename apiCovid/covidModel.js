var mongoose = require('mongoose');

// Schema
var covidSchema = mongoose.Schema({
    data: {
        type: String,
        required: true
    },
    newCases: {
        type: Number,
        required: true
    },
    uci: {
        type: Number,
        required: true
    },
});

// Export COVID Model
var Covid = module.exports = mongoose.model('covid', covidSchema);

module.exports.get = function (callback, limit) {
    Covid.find(callback).limit(limit); 
}