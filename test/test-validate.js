/**
 * New node file
 */
var mongoose = require('mongoose');
var extValidate = require('../lib/ext-validate.js');
mongoose.plugin(extValidate);
var Schema = mongoose.Schema;
var log = require("../lib/log.js");

module.exports = {
  testNumber: function(test){
    var schema = new Schema({
      aNumber: {
        type:Number,
        required: true,
        min: 5,
        max: 100
      }
    });
    var Model = mongoose.model("TestNumber",schema);
    var m = new Model({
      aNumber: "13"
    });
    m.validate(function(e){
      test.equals(e,null);
    });
    test.done();
  },
  testString: function(test){
    var schema = new Schema({
      aString: {
        type: String,
        match: /\w{4,}/i,
        maxlength: 10,
        required: true,
        enum: ["asdf","b","c"]
      }
    });
    var Model = mongoose.model("TestString",schema);
    var m = new Model({
      aString: "asdf"
    });
    m.validate(function(e){
      test.equals(e,null);
    });
    test.done();
  },
  testBoolean: function(test){
    var schema = new Schema({
      aBoolean: {
        type: Boolean,
        required: true
      }
    });
    var Model = mongoose.model("TestBoolean",schema);
    var m = new Model({
      aBoolean: ''
    });
    m.validate(function(e){
      test.equals(e,null);
    });
    test.done();
  },
  testObject: function(test){
    var schema = new Schema({
      anObject: {
        num: {
          type: Number,
          required: true
        },
        date: {
          type: Date,
          required: true
        }
      }
    });
    var Model = mongoose.model("TestObject",schema);
    var m = new Model({
      anObject: {
        num: "123",
        date: "2000-01-01"
      }
    });
    m.validate(function(e){
      test.equals(e,null);
    });
    test.done();
  },
  testDate: function(test){
    var schema = new Schema({
      aDate: {
        type: Date,
        required: true,
        max: (function (){
          var d = new Date();
          d.setYear(d.getYear()-18);
          return d;
        })(),
        min: new Date('01/01/1900')
      }
    });
    var Model = mongoose.model("TestDate",schema);
    var m = new Model({
      aDate: new Date("1997-01-01")
    });
    m.validate(function(e){
      test.equals(e,null);
    });
    test.done();
  },
  testArray: function(test){
    var schema = new Schema({
      anArrayString: {
        type: Array,
        items: {
          type: "string",
          enum: ["a","b","c","d"]
        },
        minItems: 5
      }
    });
    var Model = mongoose.model("TestArray",schema);
    var m = new Model({
      anArrayString: ["a","b","d","a","b","c"]
    });
    m.validate(function(e){
      test.equals(e,null);
    });
    test.done();
  },
  testArrayObject: function(test){
    var schema = new Schema({
      anArrayObject: {
        type: Array,
        items: {
          type:{
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
          }
        },
        minItems:2,
        maxItems: 10
      }
    });
    var Model = mongoose.model("TestArrayObject",schema);
    var m = new Model({
      anArrayObject:
        [{key:'a', value: {}},
         {key:'b', value: 'B'}]
    });
    m.validate(function(e){
      test.equals(e,null);
    });
    test.done();
  },
  testMixed: function(test){
    var schema = new Schema({
      any1: Schema.Types.Mixed,
      any2: [],
      any3: [{}],
      any4: [Schema.Types.Mixed]
    });
    var Model = mongoose.model("TestMixed",schema);
    var m = new Model({
      any1: {
        what:'ever'
      },
      any2: [1,"asdf",true],
      any3: [{what:'ever'},1,"asdf"],
      any4: [1,"2",true]
    });
    m.validate(function(e){
      test.equals(e,null);
    });
    test.done();
  }
}