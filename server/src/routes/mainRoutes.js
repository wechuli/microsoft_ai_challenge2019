const express = require("express");
const upload = require("../helpers/fileUploads");
const uuidv4 = require("uuid/v4");
const photoAnalyser = require("../helpers/photoAnalyser");
const translator = require("../helpers/translator");
const Image = require("../models/Image.model");

const router = express.Router();

// handle raw file uploads
router.post(
  "/uploadfile",
  upload,
  async (req, res) => {
    try {
      const { url } = req.file;
      await ImageRequestWorker(res, url);
    } catch (error) {
      res.status(500).json({ error: true, message: error });
    }
  },
  (error, req, res, next) => {
    res.status(400).json({ error: true, message: error.message });
  }
);

// handle url image input
router.post("/urlupload", async (req, res) => {
  try {
    const { url } = req.body;
    await ImageRequestWorker(res, url);
  } catch (error) {
    res.status(500).json({ error: true, message: error });
  }
});

// get image descriptions
router.get("/getimages/:page", async (req, res) => {
  try {
    const page = Math.abs(parseInt(req.params["page"])) || 1;
    let skipnumber = 10;

    const photos = await Image.find({})
      .limit(skipnumber)
      .skip((page - 1) * skipnumber)
      .select("-unique_string")
      .exec();
    res.status(200).json({
      error: false,
      photos
    });
  } catch (error) {
    res.status(500).json({ error: true, message: error });
  }
});

//get single image

router.get("/single/:imageId", async (req, res) => {
  try {
    const { imageId } = req.params;
    const image = await Image.findById(imageId)
      .select("-unique_string")
      .exec();
    if (!image) {
      return res
        .status(404)
        .json({ error: true, message: "No image with that Id found" });
    }
    res.status(200).json({ error: false, image });
  } catch (error) {
    res.status(500).json({ error: true, message: error });
  }
});

//Delete an image

router.delete("/single", async (req, res) => {
  try {
    const { unique_string } = req.body;
    if (!unique_string) {
      return res.status(401).json({
        error: true,
        message: "Please provide unique string to allow deletion"
      });
    }
    const imageToDelete = await Image.findOneAndDelete({ unique_string });
    if (!imageToDelete) {
      return res
        .status(404)
        .json({ error: true, message: "No image with that unique string" });
    }
    res
      .status(200)
      .json({
        error: false,
        message: "Image successfully deleted",
        imageToDelete
      });
  } catch (error) {
    res.status(500).json({ error: true, message: error });
  }
});

// Since uploading a raw image or directing the analyser to an online image is practically the same thing(in regard to how the image is ultimately analysed and translation obtained, we can make a generic function which we can use thoughout the routes, all this function needs is the url of the image and the res body as it completes the request - assuming no error occured)
const ImageRequestWorker = async (res, url) => {
  const photoAnalysisresults = await photoAnalyser(url);
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

  await newImage.save();

  res.status(201).json({
    error: false,
    message: "Image successfully uploaded",
    newImage
  });
};
module.exports = router;
