const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');

// POST /api/register - Submit registration form
router.post('/', async (req, res) => {
  try {
    const { type, fullName, email, phone, age, condition, availability, skills, message } = req.body;

    
    if (!type || !fullName || !email || !phone) {
      return res.status(400).json({ success: false, message: 'Please fill all required fields.' });
    }

    const newRegistration = new Registration({
      type,
      fullName,
      email,
      phone,
      age,
      condition,
      availability,
      skills,
      message,
    });

    await newRegistration.save();

    res.status(201).json({
      success: true,
      message: `${type === 'patient' ? 'Patient support' : 'Volunteer'} registration successful!`,
      data: newRegistration,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    console.error('Registration error:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
});

// GET /api/register - Get all registrations (admin use)
router.get('/', async (req, res) => {
  try {
    const registrations = await Registration.find().sort({ createdAt: -1 });
    res.json({ success: true, count: registrations.length, data: registrations });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

module.exports = router;
