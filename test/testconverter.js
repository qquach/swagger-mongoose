/**
 * New node file
 */
var converter = require("../converter.js");
var mongooseType = require("../schema/mongoose_schema_type.js"),
    mongooseSchema = require("../schema/mongoose_schema.js"),
    moogooseNormalized = require("../schema/moongoose_normalized.js"),
    swaggerSchemma = require("../schema/swagger_schema.js");

module.exports = {
    w2m: function(test){
      var tmp = converter.swagger2mongoose(swaggerSchema);
      test.deepEqual(moongooseNormalized, tmp);
      test.done();
    },
    m2w1: function(test){
      var tmp = converter.moongoose2swagger(mongooseNormalized);
      test.deepEqual(swaggerSchema, tmp);
      test.done();
    },
    m2w2: function(test){
      var tmp = converter.moongoose2swagger(mongooseSchema);
      test.deepEqual(swaggerSchema, tmp);
      test.done();
    },
    m2w3: function(test){
      var tmp = converter.moongoose2swagger(mongooseType);
      test.deepEqual(swaggerSchema, tmp);
      test.done();
    }
}