/**
 * New node file
 */
var mongoose = require('mongoose');
var extValidate = require('lib/ext-validate.js');
mongoose.plugin("pre")
var Schema = mongoose.Schema;
module.exports = {
    setUp: function(callback){
      console.log("set up");
      mongoose.connect('mongodb://localhost/converter',callback);
    },
    tearDown: function(callback){
      console.log("tearDown");
      mongoose.disconnect(callback);
    },
    connect: function(test){
      var schema = new Schema({
        name:String,
        check:{
          type: Boolean,
          required: true
        },
        req: {
          type: Number,
          required: true
        }
        //items: [String]
      });
      var TestModel = mongoose.model('TestModel',schema);
      var obj = new TestModel({
        name:'test name',
        check: 'asd',
        req: '0x23'
        //items:['a','b']
      });
      obj.validate(function(e){
        console.log(String(e));
        test.done();
      });
    },

    check: function(test){
      var min = [10, 'The value of path `{PATH}` ({VALUE}) is beneath the limit ({MIN}).'];
      var schema = new Schema({ n: { type: Number, min: min }});
      var M = mongoose.model('Measurement', schema);
      var s= new M({ n: 14 });
      s.validate(function (err) {
        console.log(String(err)) // ValidationError: The value of path `n` (4) is beneath the limit (10).
        console.log("get here");
        test.done();
      });
    },
    /**
     * aNumber: Number,
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
     * @param test
     */
    simpleModel: function(test){

      var simple = require("../schema/mongoose_schema.js");
      var schema = new Schema(simple);
      var Model =  mongoose.model('Simple', schema);

      var m = new Model({
        aNumber: "123",
        aString: "asdf",
        aBoolean: true,
        anObject: {
          num: "123",
          date: new Date()
        },
        aDate: new Date("2000-01-01"),
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
        if(e) console.log(e);
        test.done();
      });
    },
    normalizedModel: function(test){

      var simple = require("../schema/mongoose_normalized.js");
      var schema = new Schema(simple);
      var Model =  mongoose.model('Normalized', schema);

      var m = new Model({
        aNumber: "123",
        aString: "asdf",
        aBoolean: true,
        anObject: {
          num: "123a",
          date: new Date()
        },
        aDate: new Date("2000-01-01"),
        anArrayString: ["a","b"],
        anArrayObject:
          [{key:'1', value: {}},
           {key:'2', value: 'B'}],
        any1: {
          what:'ever'
        },
        any2: [1,"asdf",true],
        any3: [{what:'ever'},1,"asdf"],
        any4: [1,"2",true]
      });
      m.save(function(e){
        if(e) console.log(e);
        test.done();
      });
    }
}