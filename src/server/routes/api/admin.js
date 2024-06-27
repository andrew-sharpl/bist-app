const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

const Admin = require('../../models/Admin');
const User = require('../../models/User');
const Event = require('../../models/Event');



// @route   POST api/admin/register
// @desc    Register admin account
// @access  Public
router.post('/register', [
    // input validation
    check('admin', 'Admin name is required').not().isEmpty(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
], 
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { admin, password } = req.body;

    try {
        // check if admin already registered
        const lower_admin = admin.toLowerCase();
        let account = await Admin.findOne({admin: lower_admin});
        if (account) {
            return res.status(400).json({ errors: [{ msg: 'Admin already exists'}]});
        }

        // create new user
        account = new Admin({
            admin: lower_admin,
            password
        });

        // encrypt user password
        const salt = await bcrypt.genSalt(10);
        account.password = await bcrypt.hash(password, salt);

        // save to database
        await account.save();

        res.json({ msg: "Admin created"});
    }
    catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


// @route   GET api/admin
// @desc    Get current admin info
// @access  Private (admin)
{}


// @route   POST api/admin/login
// @desc    Admin login & return a token
// @access  Public
router.post('/login', [
    // input validation
    check('admin', 'Please input a admin name').exists(),
    check('password', 'Password is required').exists()
], 
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { admin, password } = req.body;

    try {
        // check if admin exists
        const lower_admin = admin.toLowerCase();
        let account = await Admin.findOne({admin: lower_admin});
        if (!account) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Input'}]});
        }

        // check password match
        const isMatch = await bcrypt.compare(password, account.password);
        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Input'}]});
        }

        // get jwt
        const payload = {
            admin: {
                id: account.id
            }
        };

        jwt.sign(payload, config.get('jwtSecret'), (err, token) => {
            if (err) throw err;
            res.json({token});
        });

    }
    catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


//######### EVENT MANAGEMENT ##############

// @route   POST api/admin/event
// @desc    Create a new event
// @access  Private (admin)
router.post('/event', auth, async (req, res) => {

    const {
        type,
        title,
        host,
        date,
        startTime,
        endTime,
        location,
        zoomLink,
        zoomPassword,
        desc,
        specialInst
    } = req.body;

    const eventFields = {};
    eventFields.type = type;
    eventFields.title = title;
    eventFields.host = host;
    eventFields.date = date;
    eventFields.startTime = startTime;
    eventFields.endTime = endTime;

    if (location) eventFields.location = location;
    if (zoomLink) eventFields.zoomLink = zoomLink;
    if (zoomPassword) eventFields.zoomPassword = zoomPassword;
    if (desc) eventFields.desc = desc;
    if (specialInst) eventFields.specialInst = specialInst;


    try {
        // check admin auth
        if (!req.admin) {
            return res.status(400).json({ msg: 'Need Admin access'});
        }

        const admin = await Admin.findOne({ _id: req.admin.id });
        if (!admin) {
            return res.status(400).json({ msg: 'Need Admin access'});
        }

        // create new event
        let event = new Event(eventFields);
        await event.save();
        res.json(event);
    }
    catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route   PUT api/admin/event/:id
// @desc    Update an event by id
// @access  Private (admin)
router.put('/event/:id', auth, async (req, res) => {

    // forms data
    const {
        type,
        title,
        host,
        date,
        startTime,
        endTime,
        location,
        zoomLink,
        zoomPassword,
        desc,
        specialInst
    } = req.body;

    const eventFields = {};
    eventFields.type = type;
    eventFields.title = title;
    eventFields.host = host;
    eventFields.date = date;
    eventFields.startTime = startTime;
    eventFields.endTime = endTime;

    if (location) eventFields.location = location;
    if (zoomLink) eventFields.zoomLink = zoomLink;
    if (zoomPassword) eventFields.zoomPassword = zoomPassword;
    if (desc) eventFields.desc = desc;
    if (specialInst) eventFields.specialInst = specialInst;


    try {
        // check admin auth
        if (!req.admin) {
            return res.status(400).json({ msg: 'Need Admin access'});
        }

        const admin = await Admin.findOne({ _id: req.admin.id });
        if (!admin) {
            return res.status(400).json({ msg: 'Need Admin access'});
        }

        // find the event by id
        let event = await Event.findById(req.params.id);

        // check if event exist
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }

        // update
        event = await Event.findOneAndUpdate(
            { _id: req.params.id },
            { $set: eventFields },
            { new: true}
            );
        
        res.json(event);
    }
    catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route   DELETE api/admin/event/:id
// @desc    Delete an event by id
// @access  Private (admin)
router.delete('/event/:id', auth, async (req, res) => {
    try {
        // check admin auth
        if (!req.admin) {
            return res.status(400).json({ msg: 'Need Admin access'});
        }

        const admin = await Admin.findOne({ _id: req.admin.id });
        if (!admin) {
            return res.status(400).json({ msg: 'Need Admin access'});
        }

        // find the event by id
        const event = await Event.findById(req.params.id);

        // check if appointment exist
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }

        // remove
        await event.remove();
        
        res.json({ msg: 'Event removed'});
    }
    catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


//########## USER MANAGEMENT ##############

// @route   GET api/admin/user
// @desc    Get all user info
// @access  Private (admin)
{}


// @route   GET api/admin/user/:id
// @desc    Get a user info by id
// @access  Private (admin)
{}


// @route   DELETE api/admin/user/:id
// @desc    Delete a user by id
// @access  Private (admin)
{}



//############# USER MANAGEMENT #################

// @route   GET api/admin/user
// @desc    Get all users
// @access  Private (admin)
router.get('/user', auth, async (req, res) => {
    try {
        // check admin auth
        if (!req.admin) {
            return res.status(400).json({ msg: 'Need Admin access'});
        }

        const admin = await Admin.findOne({ _id: req.admin.id });

        if (!admin) {
            return res.status(400).json({ msg: 'Need Admin access'});
        }

        // find all users, sort by register date
        const users = await User.find().sort({ date: -1}).select('-password -__v');

        res.json(users);
    }
    catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route   GET api/admin/profile/:user_id
// @desc    Get profile by user id
// @access  Private (admin)
router.get('/profile/:user_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).select('-__v');

        if (!profile) {
            return res.status(400).json({ msg: 'Profile not found'});
        }

        res.json(profile);
    }
    catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});



module.exports = router;