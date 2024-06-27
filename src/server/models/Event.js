const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    type: {
        type: String,
        enum: ['inPerson', 'online'],
        required : true 
    },
    title: {
        type: String,
        required: true,
    },
    host: {
        type: String,
        required: true
    },
    date: {
        type: Date,
    },
    startTime: {
        type: Date,
    },
    endTime: {
        type: Date,
    },
    location: {
        type: String
    },
    zoomLink: {
        type: String
    },
    zoomPassword: {
        type: String
    },
    desc: {
        type: String
    },
    specialInst: {
        type: String
    },
    attendees: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: "user"
            }
        }
    ],
    creationTime: {
        type: Date,
        default: Date.now
      }
});

let Event = mongoose.model("event", EventSchema);
module.exports = Event;
