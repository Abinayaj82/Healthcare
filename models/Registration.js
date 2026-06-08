const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['patient', 'volunteer'],
      required: [true, 'Registration type is required'],
    },
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    // Patient-specific fields
    age: {
      type: Number,
      required: function () { return this.type === 'patient'; },
    },
    condition: {
      type: String, // e.g., diabetes, cardiac, etc.
      trim: true,
    },
    // Volunteer-specific fields
    availability: {
      type: String, // e.g., weekends, full-time
      required: function () { return this.type === 'volunteer'; },
    },
    skills: {
      type: String, // e.g., nursing, counseling
      trim: true,
    },
    message: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Registration', registrationSchema);
