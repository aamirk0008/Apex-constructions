import mongoose from 'mongoose';

const LeadSchema = new mongoose.Schema(
  {
    // Common fields
    name:    { type: String, required: true, trim: true },
    phone:   { type: String, required: true, trim: true },
    email:   { type: String, trim: true, lowercase: true },
    city:    { type: String, trim: true },
    message: { type: String, trim: true },

    // Source tracking
    source: {
      type: String,
      enum: ['contact_form', 'estimator', 'whatsapp'],
      default: 'contact_form',
    },

    // Estimator-specific fields (optional)
    projectType: { type: String },
    area:        { type: Number },
    quality:     { type: String },
    estimateLow: { type: Number },
    estimateMid: { type: Number },
    estimateHigh:{ type: Number },

    // Status for your father's team
    status: {
      type: String,
      enum: ['new', 'contacted', 'qualified', 'converted', 'lost'],
      default: 'new',
    },

    // Meta
    ipAddress: { type: String },
    userAgent: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Lead || mongoose.model('Lead', LeadSchema);