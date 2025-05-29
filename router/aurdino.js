const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const aurdino = require("../controller/aurdinoController");
const router = express.Router();

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  // destination: function (req, file, cb) {
  //     cb(null, 'uploads');  // Ensure this folder exists
  // },
  // filename: function (req, file, cb) {
  //     cb(null, Date.now() + path.extname(file.originalname));  // Save the file with a timestamp
  // }
});

// router.post("/upload", upload.single("audio"), aurdino.getAudio);
router.post("/commands" , aurdino.sendCommand)
router.get("/commands" , aurdino.fetchCommand)
router.post("/esp32/status" , aurdino.aurdinoStatues)
router.get("/esp32/status" , aurdino.getStatus)


module.exports = router;
