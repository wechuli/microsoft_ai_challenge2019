const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const photoSchema = new Schema({
  originalname: String,
  encoding: String,
  mimetype: String,
  blobName: String,
  container: String,
  blob: String,
  blobType: String,
  size: String,
  etag: String,
  url: String,
  adult_content: Boolean,
  tags: [String],
  description: [
    {
      language: String,
      text: String
    }
  ],
  description_confidence: Number,
  width: Number,
  height: Number,
  format: String,
  unique_string: String
});

module.exports = mongoose.model("photos", photoSchema);
