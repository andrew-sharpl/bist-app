const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');


const Profile = require('../../models/Profile');


// @route   GET api/profile
// @desc    Get current user profile
// @access  Private (user)
router.get('/', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).select('-__v');

        if (!profile) {
            return res.status(400).json({ msg: 'There is no Profile for this user'});
        }

        res.json(profile);
    }
    catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route   POST api/profile
// @desc    Create/Update current user profile
// @access  Private (user)
router.post('/', auth, async (req, res) => {
    const {
        gender,
        phone,
        address,
        contactName,
        contactPhone,
        bio
    } = req.body;

    const profileFields = {};
    profileFields.user = req.user.id;

    if (gender) profileFields.gender = gender;
    else profileFields.gender = "";

    if (phone) profileFields.gender = gender;
    else profileFields.gender = "";

    if (address) profileFields.address = address;
    else profileFields.address = "";

    if (contactName) profileFields.contactName = contactName;
    else profileFields.contactName = "";

    if (contactPhone) profileFields.contactPhone = contactPhone;
    else profileFields.contactPhone = "";

    if (bio) profileFields.bio = bio;
    else profileFields.bio = "";

    try {
        let profile = await Profile.findOne({ user: req.user.id });

        // update
        if (profile) {
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields},
                { new: true}
            );

            return res.json(profile);
        }

        // create
        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile);
    }
    catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});


module.exports = router;