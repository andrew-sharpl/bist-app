const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Appointment = require('../../models/Appointment');



// @route   GET api/appointment
// @desc    Get all current user's appointments
// @access  Private (user)
router.get('/', auth, async (req, res) => {
    try {
        // find by user id and sort by creation time
        const appointments = await Appointment.find({ user: req.user.id}).sort({ creationTime: -1}).select('-__v');
        res.json(appointments);
    }
    catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route   POST api/appointment
// @desc    Create a new appointment
// @access  Private (user)
router.post('/', auth, async (req, res) => {

    const {
        host,
        date,
        time,
        phone,
        location,
        about,
        bring
    } = req.body;

    const apmtFields = {};
    apmtFields.user = req.user.id;

    if (host) apmtFields.host = host;
    else apmtFields.host = "";

    if (date) apmtFields.date = date;
    else apmtFields.date = "";

    if (time) apmtFields.time = time;
    else apmtFields.time = "";

    if (phone) apmtFields.phone = phone;
    else apmtFields.phone = "";

    if (location) apmtFields.location = location;
    else apmtFields.location = "";

    if (about) apmtFields.about = about;
    else apmtFields.about = "";

    if (bring) apmtFields.bring = bring;
    else apmtFields.bring = "";

    try {
        let appointment = new Appointment(apmtFields);
        await appointment.save();
        res.json(appointment);
    }
    catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route   GET api/appointment/:id
// @desc    Get an appointment by id
// @access  Private (user)
router.get('/:id', auth, async (req, res) => {
    try {
        // find the appointment by id
        const appointment = await Appointment.findById(req.params.id).select('-__v');

        // check if appointment exist
        if (!appointment) {
            return res.status(404).json({ msg: 'Appointment not found' });
        }
        
        res.json(appointment);
    }
    catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route   PUT api/appointment/:id
// @desc    Update an appointment by id
// @access  Private (user)
router.put('/:id', auth, async (req, res) => {

    // forms data
    const {
        host,
        date,
        time,
        phone,
        location,
        about,
        bring
    } = req.body;

    const apmtFields = {};
    apmtFields.user = req.user.id;

    if (host) apmtFields.host = host;
    else apmtFields.host = "";

    if (date) apmtFields.date = date;
    else apmtFields.date = "";

    if (time) apmtFields.time = time;
    else apmtFields.time = "";

    if (phone) apmtFields.phone = phone;
    else apmtFields.phone = "";

    if (location) apmtFields.location = location;
    else apmtFields.location = "";

    if (about) apmtFields.about = about;
    else apmtFields.about = "";

    if (bring) apmtFields.bring = bring;
    else apmtFields.bring = "";

    try {
        // find the appointment by id
        let appointment = await Appointment.findById(req.params.id);

        // check if appointment exist
        if (!appointment) {
            return res.status(404).json({ msg: 'Appointment not found' });
        }

        // check if appointment belongs to user
        if (appointment.user.toString() !== req.user.id ) {
            return res.status(401).json({ msg: 'User not authorized'});
        }

        // update
        appointment = await Appointment.findOneAndUpdate(
            { _id: req.params.id },
            { $set: apmtFields },
            { new: true}
            );
        
        res.json(appointment);
    }
    catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route   DELETE api/appointment/:id
// @desc    Delete an appointment by id
// @access  Private (user)
router.delete('/:id', auth, async (req, res) => {
    try {
        // find the appointment by id
        const appointment = await Appointment.findById(req.params.id);

        // check if appointment exist
        if (!appointment) {
            return res.status(404).json({ msg: 'Appointment not found' });
        }

        // check if appointment belongs to user
        if (appointment.user.toString() !== req.user.id ) {
            return res.status(401).json({ msg: 'User not authorized'});
        }

        // remove
        await appointment.remove();
        
        res.json({ msg: 'Appointment removed'});
    }
    catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router; 