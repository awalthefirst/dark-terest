var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = Schema({
 username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  }
});


var obj = {
  getUser: function () {
    return mongoose.model('User', userSchema);
  },

  findUser: function (query, cb) {
    obj.getUser().findOne({
      email: query.email
      }, cb);
  },

  addUser: function (query, cb) {

    var user = new obj.getUser()({
      username: query.username,
      password: query.password,
      email: query.email
    });

    user.save(cb);
  },
  
};

mongoose.connect(process.env.MongoUrl);
module.exports = obj;