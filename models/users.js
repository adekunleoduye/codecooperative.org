var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  id: Schema.Types.ObjectId,
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  username: {type: String, required: true, unique: true},
  dob: Date,
  address: String,
  dateCreated: Date,
  dateUpdated: Date,
  role: String
})

module.exports = mongoose.model('user', UserSchema);
