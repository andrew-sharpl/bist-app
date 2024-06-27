const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    host: {
        type: String,
    },
    date: {
        type: Date,
    },
    time: {
        type: Date,
    },
    phone: {
        type: Number
    },
    location: {
        type: String,
    },
    about: {
        type: String
    },
    bring: {
        type: String
    },
    creationTime: {
        type: Date,
        default: Date.now
      }
});

let Appointment = mongoose.model("appointment", AppointmentSchema);
module.exports = Appointment;
