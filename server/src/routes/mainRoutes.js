const express = require("express");
const upload = require("../helpers/fileUploads");
const uuidv4 = require("uuid/v4");
const photoAnalyser = require("../helpers/photoAnalyser");
const translator = require("../helpers/translator");
const Image = require("../models/Image.model");

const router = express.Router();

router.post(
  "/uploadfile",
  upload,
  async (req, res) => {
    try {
      const photoAnalysisresults = await photoAnalyser(req.file.url);  
      const descriptionTranslator = await translator(
        photoAnalysisresults["description"]
      );

      // build the description array
      let description = [];
      description.push({
        language: "en",
        text: photoAnalysisresults["description"]
      });
      descriptionTranslator.forEach(translation => {
        description.push({
          language: translation.to,
          text: translation.text
        });
      });
      const newImage = new Image({
        ...photoAnalysisresults,
        description,
        unique_string: uuidv4().toString()
      });

      newImage.save();

      res.status(200).json({
        error: false,
        message: "Image successfully uploaded",
        newImage
      });
    } catch (error) {
      res.status(500).json({ error: true, message: error });
    }
  },
  (error, req, res, next) => {
    res.status(400).json({ error: true, message: error.message });
  }
);
module.exports = router;
