const axios = require("axios");

let headers = {
  "Content-Type": "application/json",
  "Ocp-Apim-Subscription-Key": process.env.APPSETTING_AZURE_VISION_KEYS //change here to use your own keys
};

const getPhotoDetails = async url => {
  let body = {
    url
  };

  const result = await axios.post(
    // Change the endpoint below to match the endpoint from the Vision API -one you provision the keys on Azure, this will appear
    
    "https://vision-key.cognitiveservices.azure.com/vision/v1.0/analyze?visualFeatures=Categories,Tags,Description,Faces,Adult&language=en",
    body,
    {
      headers
    }
  );

  return {
    adult_content: result.data.adult.isAdultContent,
    tags: result.data.description.tags,
    description: result.data.description.captions[0].text,
    description_confidence: result.data.description.captions[0].confidence,
    width: result.data.metadata.width,
    height: result.data.metadata.height,
    format: result.data.metadata.format
  };
};


module.exports = getPhotoDetails;