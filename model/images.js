var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var imageSchema = Schema({
 name: {
    type: String,
    required: true
  },
  src: {
    type: String,
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
    obj.image().finde({
      name: query.name
    }, cb);
 },
 
  addimage: function (query, cb) {

    var user = new obj.image()({
      name: query.name,
      src: query.src,
      username: query.username
    });
    user.save(cb);
  },
  
  
};

module.exports = obj;