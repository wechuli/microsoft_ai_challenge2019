const uuidv4 = require("uuid/v4");
const axios = require("axios");

const endpoint =
  "https://api.cognitive.microsofttranslator.com/translate?api-version=3.0";
const subscriptionKey = process.env.APPSETTING_AZURE_TRANSLATION_KEYS;

const translateText = async text => {
  let options = {
    method: "post",
    url: `${endpoint}`,
    baseUrl: endpoint,

    params: {
      "api-version": "3.0",
      to: ["ar", "de", "it", "sw", "ko", "fr", "es", "zh-Hans"]
    },
    headers: {
      "Ocp-Apim-Subscription-Key": subscriptionKey,
      "Content-type": "application/json",
      "X-ClientTraceId": uuidv4().toString()
    },
    data: [
      {
        text
      }
    ],
    responseType: "json"
  };
  const result = await axios(options);
  return result.data[0]["translations"];
};

module.exports = translateText;
