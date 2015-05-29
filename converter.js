/**
 * New node file
 */
var Schema = require('mongoose').Schema,
    log = require("./lib/log.js");

var converter = {
    swagger2mongoose: function(definitions, name){
      log.debug("swagger2mongoose | name: %s", name);
      var out = {};
      var schema = definitions[name];
      if(!schema) return out;
      for(var i in schema){
        var p = schema[i];
        out[i] = s2m(definitions, p)
      }
      return out;
    },
    mongoose2swagger: function(schema){
      var out = {};
      return out;
    }
}

module.exports = converter;

function s2m(definitions, p){
  log.debug("s2m | p: %j", p);
  switch(p.type){
    case "number":
    case "integer":
    case "float":
    case "double":
      return toMongooseNumber(p);
    case "string":
      return toMongooseString(p);
    case "boolean":
      return toMongooseBoolean(p);
    case "date":
      return toMongooseDate(p);
    case "array":
      return toMongooseArray(definitions, p.items);
    default:
      return toMongooseObject(definitions, p);
  }
}

function toMongooseNumber(p){
  var out = {type:Number};
  return out;
}
function toMongooseString(p){
  var out = {type:String};
  return out;
}
function toMongooseBoolean(p){
  var out = {type:Boolean};
  return out;
}
function toMongooseDate(p){
  var out = {type:Date};
  return out;
}
function toMongooseArray(definitions, p){
  log.debug("toMongooseArray: %j", p);
  if(typeof(p.$ref)=="string") {
    var name = p.$ref.replace("#/definitions/","");
    return {type: [converter.swagger2mongoose(definitions,name)]};
  }
  var item = s2m(definitions, p);
  log.debug("item: %j", item);
  return item;
}
function toMongooseObject(definitions, p){
  log.debug("toMongooseObject");
  if(typeof(p.$ref)=="string") {
    var name = p.$ref.replace("#/definitions/","");
    return {type: converter.swagger2mongoose(definitions,name)};
  }
  return {type: Schema.Types.Mixed};
}

function getSchema(definitions, ref){
  log.debug("getSchema | ref: %s", ref);
  var name = ref.replace("#/definitions/","");
  return definitions[name];
}