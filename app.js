const express = require("express");
const multer = require("multer");
const bgremoverCode = require("./bgremoverCode");
const app = express();
const path = require("path");

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage }).single("image");

app.post("/", async (req, res) => {

  upload(req, res,async (err) => {
    if (err) throw err;
    console.log(req.file.path);
    //slice
    await bgremoverCode(req.file.path);

    let filename = req.file.path.split("uploads/").pop();
    
    const filePath = path.join(__dirname, "output", filename);

    res.download(filePath, filename, (err) => {
      if (err) {
        res.status(500).send({
          message: "Could not download file. " + err,
        });
      }
    });

  });
});

app.listen(4000, () => {
  console.log(`Server started on port http://localhost:4000`);
});
