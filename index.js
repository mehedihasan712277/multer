const express = require("express");
const multer = require("multer");
const path = require("path")

const app = express();

// uploads folder
const UPLOADS_FOLDER = "./uploads/";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOADS_FOLDER)
    },
    filename: (req, file, cb) => {
        const fileExt = path.extname(file.originalname)
        const fileName = file.originalname
            .replace(fileExt, "")
            .toLowerCase()
            .split(" ")
            .join("-") + "-" + Date.now();
        cb(null, fileName + fileExt)
    }
})
// multer configaruation
let upload = multer({
    storage: storage,
    limits: {
        fileSize: 1000000
    },
    fileFilter: (req, file, cb) => {
        // console.log(file);
        if (file.mimetype === "image/png" ||
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/jpeg"
        ) {
            cb(null, true);
        } else {
            cb(new Error("file formate not allowed"))
        }
    }
})

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
    res.send("setup is ok");
})

app.post("/", upload.single("avatar"), (req, res) => {
    console.log(req.file);
    res.send("file uploaded sucessfully");
})

app.listen(5000, () => {
    console.log("server is running ok");

})