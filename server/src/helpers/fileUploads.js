const multer = require("multer");
const MulterAzureStorage = require("multer-azure-storage");

const upload = multer({
  storage: new MulterAzureStorage({
    azureStorageConnectionString: process.env.APPSETTING_AZURE_STORAGE_ACCESS, //change here to use your own keys
    containerName: "photos",
    containerSecurity: "blob"
  }),
  limits: { fileSize: 100000000 },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|svg)$/)) {
      return cb(
        new Error("File format not allowed, allowed formats: jpg,jpeg,png,svg")
      );
    }

    cb(undefined, true);
    // cb(new Error(""));
    // cb(undefined, true);
  }
}).single("photo");

module.exports = upload;
