/**
 * New node file
 */
var log = require("../lib/log.js");
var extend = require("extend");

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
    if(schemaType.instance == "Array" || schemaType.instance == "Mixed"){
      extValidate(val, extend({},schemaType.options,{type:schemaType.instance.toLowerCase()}));
    }
    else{
      schemaType.doValidate(val,function(err){
        if(err){
          throw err;
        }
      });
    }
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

function extValidate(obj, schema){
  log.debug("extValidate | obj: %j, schema: %j", obj, schema);
  if(!schema || !schema.type) return;
  switch(schema.type){
    case "number":
      isValidNumber(obj, schema);
      break;
    case "string":
      isValidString(obj, schema);
      break;
    case "boolean":
      isValidBoolean(obj, schema);
      break;
    case "date":
      isValidDate(obj, schema);
      break;
    case "array":
      isValidArray(obj, schema);
      break;
    default:
      isValidObject(obj, schema);
  }
}

function isValidNumber(num, schema){
  log.debug("isValidNumber | num: %s | schema: %j, type: %s", num, schema);
  if(Object.prototype.toString.call(num) != "[object Number]") {
    if(schema.required===false && (num===undefined || num===null)) return;
    throw new Error("not a number");
  }
  if(schema.max && num > schema.max){
    throw new Error("max not valid");
  }
  if(schema.min && num < schema.min){
    throw new Error("min not valid");
  }
}

function isValidString(str, schema){
  log.debug("isValidString | str: %s | schema: %j", str, schema);
  if(Object.prototype.toString.call(str) != "[object String]") {
    if(!schema.required && (str===undefined || str===null)) return;
    throw new Error("not a string");
  }
  if(schema.enum && schema.enum.length >0 && schema.enum.indexOf(str)==-1){
    throw new Error("not valid enum value");
  }
  if(schema.match && !schema.match.test(str)){
    throw new Error("not match regExp");
  }
  if(schema.maxlength && str.length > schema.maxlength){
    throw new Error("maxlength not valid");
  }
  if(schema.minlength && str.length < schema.minlength){
    throw new Error("minlength not valid");
  }
}

function isValidBoolean(bool, schema){
  log.debug("isValidNumber | bool: %s | schema: %j, type: %s", bool, schema);
  if(Object.prototype.toString.call(bool) != "[object Number]") {
    if(schema.required===false && (bool===undefined || bool===null)) return;
    throw new Error("not a boolean");
  }
}

function isValidDate(date, schema){
  log.debug("isValidDate | date: %s | schema: %j", date, schema);
  if(Object.prototype.toString.call(date) != "[object Date]") {
    if(schema.required===false && (date===undefined || date===null)) return;
    throw new Error("not a date");
  }
  if(schema.max && date > schema.max){
    throw new Error("date larger than max date");
  }
  if(schema.min && date < schema.min){
    throw new Error("date less than min date");
  }
}
function isValidArray(arr, schema){
  log.debug("isValidArray | arr: %j, schema: %j", arr, schema);
  if(Object.prototype.toString.call(arr) != "[object Array]"){
    if(!schema.required && (arr===undefined || arr===null)) return;
    throw new Error("not an array");
  }
  log.debug("passed required");
  if(schema.minItems!=undefined && arr.length < schema.minItems){
    throw new Error("array length smaller than minItems")
  }
  log.debug("passed min");
  if(schema.maxItems!=undefined && arr.length > schema.minItems){
    throw new Error("array length larger than maxItems")
  }
  log.debug("passed max");
  for(var i = 0 ; i < arr.length; i++){
    extValidate(arr[i], schema.items);
  }
}

function isValidObject(obj, schema){
  if(Object.prototype.toString.call(obj) != "[object Object]"){
    if(!schema.required && (obj===undefined || obj===null)) return;
    throw new Error("not an object");
  }

  if(schema.minPropertes!=undefined){
    var count = 0;
    for(var i in obj){
      count++;
    }
    if(count < schema.minProperties) throw new Error("number of properties smaller than minProperties")
  }

  if(schema.mmaxPropertes!=undefined){
    var count = 0;
    for(var i in obj){
      count++;
    }
    if(count < schema.maxProperties) throw new Error("number of properties larger than maxProperties")
  }

  for(var i in obj){
    extValidate(obj[i], schema[i]);
  }
}
