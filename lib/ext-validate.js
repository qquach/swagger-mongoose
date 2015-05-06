/**
 * New node file
 */
var log = require("../lib/log.js");

module.exports = function(schema, options){
  schema.pre("validate", true, function(next,done){
    log.debug("pre validate: this: %j", this);
    try{
      validate(this,schema);
      log.debug("calling next");
      next();
    }
    catch(e){
      next(e);
    }
  });
}
var privateVars = {_id:1,__v:1};

function validate(obj, schema){
  log.debug("schema: %j", schema.paths);
  for(var i in schema.paths){
    if(i in privateVars) continue;
    var schemaType = schema.paths[i];
    var val = getVal(obj, schemaType.path);
    schemaType.doValidate(val,function(err){
      if(err){
        throw err;
      }
    });
  }
}

function getVal(obj, properties){
  log.debug("getVal properties: %s", properties);
  var arr = properties.split(".");
  var out = obj;
  for(var i = 0; i< arr.length; i++){
    log.debug("prop: %s", arr[i]);
    out = out[arr[i]];
  }
  return out;
}