const mongoose = require('mongoose');

const analysisSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  gigUrl: {
    type: String,
    required: [true, 'Please provide a gig URL']
  },
  platform: {
    type: String,
    enum: ['fiverr', 'upwork'],
    required: true
  },
  gigData: {
    title: String,
    description: String,
    tags: [String],
    sellerLevel: String,
    price: Number,
    category: String
  },
  analysisResults: {
    keywordDensity: Map,
    titleScore: {
      type: Number,
      min: 0,
      max: 100
    },
    descriptionScore: {
      type: Number,
      min: 0,
      max: 100
    },
    tagScore: {
      type: Number,
      min: 0,
      max: 100
    },
    gigScore: {
      type: Number,
      min: 0,
      max: 100
    },
    suggestions: [String],
    recommendedTags: [String],
    missingKeywords: [String]
  },
  competitorData: [{
    url: String,
    title: String,
    score: Number,
    tags: [String],
    price: Number,
    reviews: Number
  }],
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 2592000 // Auto-delete after 30 days
  }
});

module.exports = mongoose.model('Analysis', analysisSchema);