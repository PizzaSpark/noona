const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const mongoose = require("mongoose");
const MenuModel = require("./models/menu.model");
const AdminModel = require("./models/admin.model");

const multer = require("multer");

app.use(cors());
app.use(bodyParser.json());

// Stating the path of the uploads directory
const uploadsDir = path.join(__dirname, "/uploads");

// Create the uploads directory if it doesn't exist
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

app.use("/uploads", express.static(uploadsDir));

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
        cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
        filename = Date.now() + "-" + file.originalname;
        cb(null, filename);
    },
});

const upload = multer({ storage: storage });

// Error handling middleware
const handleError = (err, res) => {
    console.error("Error:", err);
    res.json({ error: "Internal Server Error" });
};

// Function to delete image
const deleteImage = (imagePath) => {
    fs.unlink(imagePath, (err) => {
        if (err) console.error("Error deleting old image:", err);
    });
};

//add
app.post("/addmenu", upload.single("image"), async (req, res) => {
    const incomingData = req.body;
    incomingData.image = req.file.filename;

    try {
        const dataObject = new MenuModel(incomingData);
        await dataObject.save();
        res.json({ success: true, message: "Data added successfully!" });
    } catch (error) {
        console.error("Error adding data:", error);
        handleError(error, res);
    }
});

//view
app.get("/viewmenu", async (req, res) => {
    try {
        const gotDataList = await MenuModel.find();
        res.json(gotDataList);
    } catch (error) {
        console.error("Error getting data:", error);
        handleError(error, res);
    }
});

// Update route
app.post("/updatemenu", upload.single("image"), async (req, res) => {
    const incomingData = req.body;
    if (req.file) {
        incomingData.image = req.file.filename;
    }

    try {
        const dataObject = await MenuModel.findOne({ name: incomingData.name });
        if (!dataObject) {
            return res.json({ message: "Data not found" });
        }

        // Delete the old image only if a new one has been uploaded
        if (
            req.file &&
            dataObject.image &&
            typeof dataObject.image === "string"
        ) {
            try {
                const imagePath = path.join(uploadsDir, dataObject.image);
                deleteImage(imagePath);
            } catch (urlError) {
                console.error("Error parsing old image URL:", urlError);
            }
        }

        // Update the document and save it
        Object.assign(dataObject, incomingData);
        await dataObject.save();
        res.json({ success: true, message: "Data updated successfully!" });
    } catch (error) {
        handleError(error, res);
    }
});

//delete
app.delete("/deletemenu", async (req, res) => {
    const incomingData = req.body;
    let dataObject;
    try {
        dataObject = await MenuModel.findOne({ name: incomingData.name });
        if (!dataObject) {
            return res.json({ message: "Data not found" });
        }

        // Delete the image if it exists
        if (dataObject.image && typeof dataObject.image === "string") {
            const imagePath = path.join(uploadsDir, dataObject.image);
            console.log("Deleting image at path:", imagePath);
            deleteImage(imagePath);
        } else {
            console.error("No valid image path found for deletion");
        }

        try {
            await MenuModel.deleteOne({ _id: dataObject._id });
        } catch (error) {
            console.error("Error deleting data:", error);
            return res.json({ message: "Error deleting data" });
        }

        res.json({ success: true, message: "Data deleted successfully!" });
    } catch (error) {
        console.error("Error deleting data:", error);
        handleError(error, res);
    }
});

//add
app.post("/addadmin", async (req, res) => {
    const incomingData = req.body;

    try {
        const dataObject = new AdminModel(incomingData);
        await dataObject.save();
        res.json({ success: true, message: "Data added successfully!" });
    } catch (error) {
        console.error("Error adding data:", error);
        handleError(error, res);
    }
});

//view
app.get("/viewadmins", async (req, res) => {
    try {
        const gotDataList = await AdminModel.find();
        res.json(gotDataList);
    } catch (error) {
        console.error("Error getting data:", error);
        handleError(error, res);
    }
});

//edit
app.post("/updateadmin", async (req, res) => {
    const incomingData = req.body;

    try {
        const dataObject = await AdminModel.findOne({
            email: incomingData.email,
        });
        if (!dataObject) {
            res.json({ message: "Data not found" });
        } else {
            Object.assign(dataObject, incomingData);
            await dataObject.save();
            res.json({ success: true, message: "Data updated successfully!" });
        }
    } catch (error) {
        console.error("Error updating data:", error);
        handleError(error, res);
    }
});

//delete
app.delete("/deleteadmin", async (req, res) => {
    const incomingData = req.body;
    console.log(incomingData);
    try {
        const dataObject = await AdminModel.findOne({
            email: incomingData.email,
        });
        if (!dataObject) {
            res.json({ message: "Data not found" });
        } else {
            await AdminModel.deleteOne({ _id: dataObject._id });
            res.json({ success: true, message: "Data deleted successfully!" });
        }
    } catch (error) {
        console.error("Error deleting data:", error);
        handleError(error, res);
    }
});

//login
app.post("/login", async (req, res) => {
    const incomingData = req.body;
    try {
        const dataObject = await AdminModel.findOne({
            email: incomingData.email,
            password: incomingData.password,
        });
        if (!dataObject) {
            res.json({ message: "Invalid email or password" });
        } else {
            res.json({ success: true, message: "Login successful" });
        }
    } catch (error) {
        console.error("Error logging in:", error);
        handleError(error, res);
    }
});
