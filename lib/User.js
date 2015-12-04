var dataStore = require("./DataStore").store;
//removed .js bc calling the class, vs the file (which was technopile)
var Model = require("./Model");
//not 'new' because need to access file to export, vs creating a new instance each time like DataStore
module.exports = User;

function User () {
  var UserSchema = {
    username: String,
    password: String,
  };
Model.call(this, UserSchema);
Model.extend(User);
}
