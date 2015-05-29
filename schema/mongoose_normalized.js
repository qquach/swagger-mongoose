/**
 * New node file
 */
var Schema = require('mongoose').Schema;

module.exports = {
    aNumber: {
      type:Number
    },
    aString: {
      type:String
    },
    aBoolean: {
      type: Boolean
    },
    anObject: {
      type:{
        num: {
          type: Number
        },
        date: {
          type:Date
        }
      }
    },
    aDate: {
      type: Date,
    },
    anArrayString: {
      type:[String]
    },
    anArrayObject: {
      type:[{
        key:{
          type: Number
        },
        value: {
          type: String
        }
      }]
    },
    any1: {
      type: Schema.Types.Mixed,
    },
    any2: {
      type:Schema.Types.Mixed
    },
    any3: {
      type:Schema.Types.Mixed
    },
    any4: {
      type:Schema.Types.Mixed
    }
}