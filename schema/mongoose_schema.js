/**
 * New node file
 */
var Schema = require('mongoose').Schema;

module.exports = {
    aNumber: Number,
    aString: String,
    aBoolean: Boolean,
    anObject: {num: Number, date: Date},
    aDate: Date,
    anArrayString: [String],
    anArrayObject: [{key:String, value: String}],
    any1: Schema.Types.Mixed,
    any2: [],
    any3: [{}],
    any4: [Schema.Types.Mixed]
}