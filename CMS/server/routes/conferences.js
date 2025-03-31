const router = require('express').Router();
const Conference = require('../models/conference'); // Fixed path
const auth = require('../middleware/auth'); // Import auth middleware

// Create Conference (requires authentication)
router.post('/', auth, async (req, res) => {
  try {
    const conference = new Conference(req.body);
    await conference.save();
    res.status(201).json(conference);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Conferences
router.get('/', async (req, res) => {
  try {
    const conferences = await Conference.find();
    res.json(conferences);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
