const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const mongoose = require("mongoose");
const MenuModel = require("./models/menu.model");
const path = require("path");
const multer = require("multer");
const { URL } = require("url");

app.use(cors());
app.use(bodyParser.json());

const uploadsDir = path.join(__dirname, "/uploads");

if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

const port = 1337;
const dbName = "noona-database";

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res) => {
    res.send("Hello, world!");
});

mongoose
    .connect("mongodb://localhost:27017/" + dbName)
    .then(() => console.log("Database connected successfully"))
    .catch((err) => console.error("Database connection error", err));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/");
    },
    filename: function (req, file, cb) {
        cb(
            null,
            new Date().toISOString().replace(/:/g, "-") + file.originalname
        );
    },
});

const upload = multer({ storage: storage });

//add
app.post("/addmenu", upload.single("image"), async (req, res) => {
    const incomingData = req.body;
    incomingData.image =
        req.protocol + "://" + req.get("host") + "/" + req.file.path;

    try {
        const dataObject = new MenuModel(incomingData);
        await dataObject.save();
        res.json({ success: true, message: "Data added successfully!" });
    } catch (error) {
        console.error("Error adding data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//view
app.get("/viewmenu", async (req, res) => {
    try {
        const gotDataList = await MenuModel.find();
        res.json(gotDataList);
    } catch (error) {
        console.error("Error getting data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//update
app.post("/updatemenu", upload.single("image"), async (req, res) => {
    const incomingData = req.body;
    if (req.file) {
        incomingData.image = req.protocol + "://" + req.get("host") + "/" + req.file.path;
    }

    try {
        const dataObject = await MenuModel.findOne({ name: incomingData.name });
        if (!dataObject) {
            res.json({ success: false, message: "Data not found" });
        } else {
            // Delete the old image
            if (dataObject.image && typeof dataObject.image === "string") {
                try {
                    const imageUrl = new URL(dataObject.image);
                    const imagePath = path.join(__dirname,  decodeURI(imageUrl.pathname));
                    fs.unlink(imagePath, (err) => {
                        if (err) console.error("Error deleting old image:", err);
                    });
                } catch (urlError) {
                    console.error("Error parsing old image URL:", urlError);
                }
            }

            // Update the document and save it
            Object.assign(dataObject, incomingData);
            await dataObject.save();
            res.json({ success: true, message: "Data updated successfully!" });
        }
    } catch (error) {
        console.error("Error updating data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//delete
app.delete("/deletemenu", async (req, res) => {
    const incomingData = req.body;
    try {
        const dataObject = await MenuModel.findOne({ name: incomingData.name });
        console.log(dataObject);
        if (!dataObject) {
            res.json({ success: false, message: "Data not found" });
        } else {
            // Ensure the image property exists and is a valid URL
            if (dataObject.image && typeof dataObject.image === "string") {
                try {
                    const imageUrl = new URL(dataObject.image);
                    const imagePath = path.join(__dirname,  decodeURI(imageUrl.pathname));
                    console.log("Deleting image at path:", imagePath);

                    // Delete the image file
                    fs.unlink(imagePath, (err) => {
                        if (err) {
                            console.error("Error deleting image:", err);
                        } else {
                            console.log("Image deleted successfully");
                        }
                    });
                } catch (urlError) {
                    console.error("Error parsing image URL:", urlError);
                }
            } else {
                console.warn("No valid image path found for deletion");
            }
            await MenuModel.deleteOne({ _id: dataObject._id });
            res.json({ success: true, message: "Data deleted successfully!" });
        }
    } catch (error) {
        console.error("Error deleting data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
