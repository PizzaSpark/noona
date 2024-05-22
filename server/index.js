const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const mongoose = require("mongoose");
const DataModel = require("./models/journal.model");
const path = require("path");
const multer = require("multer");

app.use(cors());
app.use(bodyParser.json());

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

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
app.post("/add", upload.single('image'), async (req, res) => {
    const incomingData = req.body;
    incomingData.image = req.file.path;

    try {
        const dataObject = new DataModel(incomingData);
        await dataObject.save();
        res.json({ success: true, message: "Data added successfully!" });
    } catch (error) {
        console.error("Error adding data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//view
app.get("/view", async (req, res) => {
    try {
        const gotDataList = await DataModel.find();
        res.json(gotDataList);
    } catch (error) {
        console.error("Error getting data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//edit
app.post("/edit", upload.single('image'), async (req, res) => {
    const incomingData = req.body;
    incomingData.image = req.file.path;

    try {
        const dataObject = await DataModel.findOne({ title: incomingData.title });
        if (!dataObject) {
            res.json({ success: false, message: "Data not found" });
        } else {
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
app.delete("/delete", async (req, res) => {
    const incomingData = req.body;

    try {
        const dataObject = await DataModel.findOne({ title: incomingData.title });
        if (!dataObject) {
            res.json({ success: false, message: "Data not found" });
        } else {
            fs.unlink(path.join(__dirname, dataObject.image), (err) => {
                if (err) console.error("Error deleting image:", err);
            });
            await dataObject.remove();
            res.json({ success: true, message: "Data deleted successfully!" });
        }
    } catch (error) {
        console.error("Error deleting data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
