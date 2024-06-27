const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  gender: {
    type: String
  },
  phone: {
    type: Number
  },
  address: {
    type: String
  },
  contactName: {
    type: String
  },
  contactPhone: {
    type: Number
  },
  bio: {
    type: String
  }
  });

let Profile = mongoose.model("profile", ProfileSchema);
module.exports = Profile;
