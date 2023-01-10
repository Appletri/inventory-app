const mongoose = require('mongoose');

const Schema = mongoose.Schema

const ItemSchema = new Schema({
  name: { type: String, required: true, maxLength: 100},
  quality: {type: String},
  creator: { type: String, maxLength: 100},
  date_of_creation: {type: Date},
  description: { type: String, required: true },
  stats: {
    "type": "array",
    "stat": {
      "type": "object",
    },
    "minItems": 2,
    "maxItems": 6,  
  },
  special: { type: String, required: true },
});

ItemSchema.virtual("url").get(function () {
  return `/bag/item/${this._id}`
})

module.exports = mongoose.model('item', ItemSchema)