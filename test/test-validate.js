/**
 * New node file
 */
var mongoose = require('mongoose');
var extValidate = require('../lib/ext-validate.js');
mongoose.plugin(extValidate);
var Schema = mongoose.Schema;
var log = require("../lib/log.js");

module.exports = {
  testPlugin: function(test){
    var schema = new Schema({
      aNumber: {
        type:Number,
        required: true,
        min: 5,
        max: 100
      },
      aString: {
        type: String,
        match: /\w{4,}/i,
        maxlength: 10,
        required: true,
        enum: ["asdf","b","c"]
      },
      aBoolean: {
        type: Boolean,
        required: true
      },
      anObject: {
        num: {
          type: Number,
          required: true
        },
        date: {
          type: Date,
          required: true
        }
      },
      aDate: {
        type: Date,
        required: true,
        max: (function (){
          var d = new Date();
          d.setYear(d.getYear()-18);
          return d;
        })(),
        min: new Date('01/01/1900')
      },
      anArrayString: {
        type: Array,
        items: {
          type: "string",
          enum: ["a","b","c","d"]
        },
        minlength: 5
      },
      anArrayObject: {
        type: Array,
        items: {
          key: {
            type: "string",
            enum:["a","b"],
            required:true
          },
          value: {
            type: "string",
            required: true,
            maxlength: 1,
          }
        },
        minlength:2,
        maxlength: 10
      },
      any1: Schema.Types.Mixed,
      any2: [],
      any3: [{}],
      any4: [Schema.Types.Mixed]
    });
    var Model = mongoose.model("TestPlugin",schema);
    var m = new Model({
      aNumber: "13",
      aString: "asdf",
      aBoolean: '',
      anObject: {
        num: "123",
        date: "2000-01-01"
      },
      aDate: new Date("1997-01-01"),
      anArrayString: ["a","b"],
      anArrayObject:
        [{key:'a', value: {}},
         {key:'b', value: 'B'}],
      any1: {
        what:'ever'
      },
      any2: [1,"asdf",true],
      any3: [{what:'ever'},1,"asdf"],
      any4: [1,"2",true]
    });
    m.validate(function(e){
      log.debug("validate come back: %s", e.message);
      test.equals(e,null);
    });
    test.done();
  }
}