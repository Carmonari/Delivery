const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  aPaterno: {
    type: String,
  },
  aMaterno: {
    type: String,
  },
  cel: {
    type: String,
  },
  avatar: {
    type: String,
    default: null,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// eslint-disable-next-line no-undef
module.exports = UserDelivery = mongoose.model('users-delivery', UserSchema);
