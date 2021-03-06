var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var imageSchema = Schema({
 name: {
    type: String,
    required: true
  },
  src: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  }
});


var obj = {
  image: function () {
    return mongoose.model('Image', imageSchema);
  },

  getAllimage: function (query, cb) {
    obj.image().find(query, cb);
  },

 getUserImage:function(query, cb){
    obj.image().find({
      username: query.username
    }, cb);
 },
 
  addImage: function (query, cb) {
    var user = new obj.image()({
      name: query.name,
      src: query.src,
      username: query.username
    });
    user.save(cb);
  },
  
  removeImage:function(query, cb){
    obj.image().findOneAndRemove({
      name: query.name,
      username:query.username,
      src:query.src
    }, cb);
 }
  
};

module.exports = obj;