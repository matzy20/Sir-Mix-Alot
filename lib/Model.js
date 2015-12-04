//creating temp variable for store, added store
var dataStore = require("./DataStore").store;
//removed .js bc calling the class, vs the file (which was technopile)
var extend = require("./extend");
module.exports = Model;

function Model (schema) {

  this.schema = schema;
  this.id = null;

  for(var k in schema) {
    if(schema.hasOwnProperty(k)) {
      //this[k] = the new instance of model being created
      this[k] = null;
    }
  }

  //this.constructor.name is the constructor's name as the key .. used console.log to see what was on constructor
  dataStore[this.constructor.name] = dataStore[this.constructor.name] || [];
}
//static = things you need standard and not-shared (not prototype), single source of truth across
Model.getNextId = function () {
  var highestId = 0;
  //dataStore[this.name] vs dataStore[this.constructor.name] bc wasn't pulling name property 'Model'
  for(var i=0; i < dataStore[this.name].length; i++){
    //chained [i], indexing in property [this.name], seeking the id on dataStore object (which is in an array) with dot notation
    //index is the same as key
    if(dataStore[this.name][i].id > highestId) {
      //redefining highestId, so placed on left
      //also be mindful of what you're returning
      highestId = dataStore[this.name][i].id;
    }
  }
  return highestId + 1;
};
Model.find = function (id){

  //iterate and look in dataStore, find id (key that matches model name) on object and inspect id to find one that matches
  for(var i = 0; i < dataStore[this.name].length; i++){
    console.log(dataStore[this.name][i]);
    if(dataStore[this.name][i].id === id){
      // console.log("found", dataStore[this.name][i]);
      return dataStore[this.name][i];
    }
  }
  return null;
};
Model.extend = function (klass){
  var destination = klass;
  //'this' is before the name of the method, so this = Model
  //this loop is pulling all the statics from Model, onto klass as the destination
  for(var k in this) {
    if(this.hasOwnProperty(k)) {
      klass[k] = this[k];
    }
  }
  //loop is pulling prototypes from Model onto klass

  for(var l in this.prototype){
    //'this' is before the name of the method, so this = Model.prototype
    if(this.prototype.hasOwnProperty(l)) {
      klass.prototype[l] = this.prototype[l];
    }
  }
};
Model.prototype.save = function () {
  //this.id is null is the rule so always checking with null
  if(this.id === null){
    this.id = this.constructor.getNextId();
  //put 'constructor' vs 'this.name' because we're specifying which constructor its coming from
  //'this' is THE object
    dataStore[this.constructor.name].push(this);
 }
};
Model.prototype.destroy = function () {
  var remove;
  if(this.id !== null){
    var found = this.constructor.find(this.id);
    var index = dataStore[this.constructor.name].indexOf(found);
    if(index > -1){
      dataStore[this.constructor.name].splice(index, 1);
    }
  }
  return null;
};


