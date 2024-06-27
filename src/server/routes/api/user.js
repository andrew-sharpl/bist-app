const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/auth');

const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Appointment = require('../../models/Appointment');



// @route   GET api/user
// @desc    Get current user info
// @access  Private (user)
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password -__v');
        res.json(user);
    }
    catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route   POST api/user/register
// @desc    Register user & return a token
// @access  Public
router.post('/register', [
    // input validation
    check('firstName', 'First name is required').not().isEmpty(),
    check('lastName', 'Last Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
], 
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, password } = req.body;

    try {
        // check if email already registered
        const lower_email = email.toLowerCase();
        let user = await User.findOne({email: lower_email});
        if (user) {
            return res.status(400).json({ errors: [{ msg: 'User already exists'}]});
        }

        // create new user
        user = new User({
            firstName,
            lastName,
            email: lower_email,
            password
        });

        // encrypt user password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // save to database
        await user.save();

        // get jwt
        const payload = {
            user: {
                id: user.id
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


// @route   POST api/user/login
// @desc    User login & return a token
// @access  Public
router.post('/login', [
    // input validation
    check('email', 'Please input a valid email').isEmail(),
    check('password', 'Password is required').exists()
], 
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // check if user exists
        const lower_email = email.toLowerCase();
        let user = await User.findOne({email: lower_email});
        if (!user) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Input'}]});
        }

        // check password match
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Input'}]});
        }

        // get jwt
        const payload = {
            user: {
                id: user.id
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


// @route   POST api/user/password
// @desc    Change current user password
// @access  Private (user)
{}


// @route   DELETE api/user
// @desc    Delete current user and all associated information
// @access  Private (user)
router.delete('/', auth, async (req, res) => {
    try {
        // remove user created appointments
        await Appointment.deleteMany( { user: req.user.id});

        // remove user profile
        await Profile.findOneAndRemove({ user: req.user.id });

        // remove user
        await User.findOneAndRemove({ _id: req.user.id });

        res.json( {msg: 'User Deleted'} );
    }
    catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;