/**
 * New node file
 */
var Schema = require('mongoose').Schema;
var testEnum = {
  values : ["first", 'second'],
  message : 'error message shown on failed validate'
}
module.exports = {
  aNumber : {
    type : Number,
    "default" : 10,
    required : true,
    min : 0,
    max : 60,
    // logical options
    get : function(){
    }, // getter
    set : function(){
    }, // setter
    // obj can be regex, function or object
    validate : function(obj, msg, type){
    },
    /*
     * validate: [{validator:func1, msg:""},{validator: func2, msg: ""}]
     */
    // mongoDb options
    index : {},
    select : true,
    sparse : false,
    text : false,
    unique : false
  },
  aString : {
    type : String,
    required : true,
    enum : testEnum,
    match : /\w+/,
    // maxlength: 10, without error message
    maxlength : [10, 'error message for max length'],
    minlength : [8, 'error message for min length'],
    // extra functions
    lowercase : true,
    trim : true,
    uppercase : true,
  },
  aBoolean : {
    type : Boolean,
    required : true
  },
  anObject : {
    type : {
      num : Number,
      date : Date
    },
    required : true
  },
  aDate : {
    type : Date,
    required : true,
    max : Date('2015-01-01'),
    min : Date('2014-01-01'),
    // functions
    expires : 60 * 60 * 24
  },
  anArrayString : {
    type : [String],
    required : true
  },
  anArrayObject : {
    type : [{
      key : String,
      value : String
    }],
    required : true
  },
  any1 : {
    type : Schema.Types.Mixed,
    required : true,
  },
  any2 : {
    type : [],
    required : true
  },
  any3 : {
    type : [{}],
    require : true
  },
  any4 : {
    type : [Schema.Types.Mixed],
    require : true
  }
}