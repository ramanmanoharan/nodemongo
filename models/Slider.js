var mongoose = require('mongoose');
var SliderSchema = new mongoose.Schema({
  slidertitle: String,
  sliderdesc: String,
  sliderfile: String,
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Slider', SliderSchema);