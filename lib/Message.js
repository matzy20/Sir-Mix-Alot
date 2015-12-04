var User = require("./User");
//removed .js bc calling the class, vs the file (which was technopile)
var Model = require("./Model");
//not 'new' because need to access file to export, vs creating a new instance each time like DataStore
module.exports = Message;

function Message () {
  var MessageSchema = {
    from: User,
    to: User,
    message: String,
    sent: Date,
  };
Model.call(this, MessageSchema);
Model.extend(Message);
}