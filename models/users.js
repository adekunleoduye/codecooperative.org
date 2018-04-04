import { ObjectId, ObjectID } from '../../../../Library/Caches/typescript/2.6/node_modules/@types/bson';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
ObjectId = Schema.ObjectId;

mongoose.connect('mongodb://gmarraro:G13aby@ds125195.mlab.com:25195/code-coop-users')

var UserSchema = new Schema({
  id: Schema.Types.ObjectId,
  givenName: {type: String, required: true},
  familyName: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  username: {type: String, required: true, unique: true},
  dob: Date,
  address: String,
  dateCreated: Date,
  dateUpdated: Date,
  role: String
})

UserSchema.pre('save', function (next) {
  var user = this.username;
  if (this.isModified('password') || this.isNew) {
      bcrypt.genSalt(10, function (err, salt) {
          if (err) {
              return next(err);
          }
          bcrypt.hash(user.password, salt, function (err, hash) {
              if (err) {
                  return next(err);
              }
              user.password = hash;
              next();
          });
      });
  } else {
      return next();
  };
  var currentDate = new Date();
  this.dateUpdated = currentDate;
  if (!this.dateCreated) {
    this.dateCreated = currentDate;
  }

});

UserSchema.methods.comparePassword = function (passw, cb) {
  bcrypt.compare(passw, this.password, function (err, isMatch) {
      if (err) {
          return cb(err);
      }
      cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);
