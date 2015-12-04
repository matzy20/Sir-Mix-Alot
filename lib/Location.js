var Model = require("./Model");
//not 'new' because need to access file to export, vs creating a new instance each time like DataStore
module.exports = Location;

function Location (argument) {
  var LocationSchema = {
    lng: Number,
    lat: Number,
  };
Model.call(this, LocationSchema);
Model.extend(Location);
}