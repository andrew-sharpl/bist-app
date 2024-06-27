const express = require('express');
const mongoose = require("mongoose");
const router = express.Router();
const auth = require('../../middleware/auth');

const Event = require('../../models/Event');


// @route   GET api/event/enrolled
// @desc    Get all events the user has enrolled
// @access  Private (user)
router.get('/enrolled', auth, async (req, res) => {
    try {
        // create user object from user id
        const objectId = mongoose.Types.ObjectId(req.user.id);

        // get all events user enrolled
        const events = await Event.find({ 'attendees.user': objectId }).sort({ creationTime: -1}).select('-__v');

        res.json(events);
    }
    catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route   GET api/event/:id
// @desc    Get an event by id
// @access  Private
router.get('/:id', auth, async (req, res) => {
    try {
        // find the event by id
        const event = await Event.findById(req.params.id).select('-__v');

        // check if event exist
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }
        
        res.json(event);
    }
    catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route   GET api/event
// @desc    Get all events
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        // get all events and sort by creation time
        const events = await Event.find().sort({ creationTime: -1}).select('-__v');

        res.json(events);
    }
    catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route   PUT api/event/register/:id
// @desc    Register an event by id
// @access  Private (user)
router.put('/register/:id', auth, async (req, res) => {
    try {
        // find the event by id
        const event = await Event.findById(req.params.id);

        // check if event exist
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }

        // check if user already signed up
        if (event.attendees.filter(attendee => attendee.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ msg: 'User already registered' });
        }

        // add user to attendee list
        event.attendees.unshift({ user: req.user.id });

        await event.save();
        
        res.json({ msg: 'Event register successful' });
    }
    catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route   PUT api/event/deregister/:id
// @desc    Deregister an event by id
// @access  Private (user)
router.put('/deregister/:id', auth, async (req, res) => {
    try {
        // find the event by id
        const event = await Event.findById(req.params.id);

        // check if event exist
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }
        
        // check if user has signed up
        if (event.attendees.filter(attendee => attendee.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({ msg: 'User has not registered this event' });
        }

        // remove user from attendee list
        const removeIndex = event.attendees.map(attendee => attendee.user.toString()).indexOf(req.user.id);
        event.attendees.splice(removeIndex, 1);

        await event.save();
        
        res.json({ msg: 'Event deregister successful' });
    }
    catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;