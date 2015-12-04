var User = require("./User");
//removed .js bc calling the class, vs the file (which was technopile)
var Model = require("./Model");
//not 'new' because need to access file to export, vs creating a new instance each time like DataStore
module.exports = Account;

function Account () {
  var AccountSchema = {
    user: User,
    accountNumber: Number,
    address: String,
    balance: Number,
  };
Model.call(this, AccountSchema);
Model.extend(Account);
}