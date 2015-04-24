/**
 * New node file
 */
var Schema = require('mongoose').Schema;

module.exports = {
    aNumber: {
      type: Number,
      "default": 10,
      required: true,
      min: 0,
      max: 60,
      //logical options
      get: function(){}, //getter
      set: function(){}, //setter
      //mongoDb options
      index: {},
      select:true,
      sparse: false,
      text: false,
      unique: false,
      validatate: function(obj, msg, type){}//obj can be regex, function or object
      /*
       * validate: [{validator:func1, msg:""},{validator: func2, msg: ""}]
       * */
    },
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