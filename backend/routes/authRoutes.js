const express = require("express");
const { protect } = require("../middleware/authMiddleware");

const {
    registerUser,
    loginUser,
    getUserInfo,
} = require("../controllers/authController");

const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post("/register", registerUser); 
router.post("/login", loginUser);
router.get("/getUser", protect, getUserInfo);

// /upload => for viewing , /upload-image => for uploading
router.post("/upload-image", upload.single("image"), (req, res) => {
    /* upload.single("image"):This is upload middleware (go see it) that handles file uploads.
       It looks for a file in the request with the name "image" (like from a form field).
       sends that image to multer to save it in storage
       
       <form action="/upload-image" method="POST" enctype="multipart/form-data">
            <input type="file" name="image" />
            <button type="submit">Upload</button>
       </form>- That name="image" is what matches upload.single("image").
    */
    if (!req.file) {
        /* After Multer processes the uploaded file using upload.single("image"), 
        it adds a new property called file to the req object. So req.file contains all the info about the uploaded file. */
        return res.status(400).json({ message: "No file uploaded" });
    }
    // this below URL must be added to databaseas profileimageurl
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    //This line builds a full URL (like http://localhost:5000/uploads/1715199999999-cat.png) to the uploaded image, so the frontend (browser) can access and display it.
    //Part	What it means ,req.protocol->Gets the protocol used in the request, like http or https.req.get("host")-Gets the host like localhost:5000 or example.com.
    //uploads/	The folder where the file is stored, as you defined in your multer config.
    //req.file.filename	The actual name of the uploaded file, e.g., 1715199999999-cat.png
    res.status(200).json({ imageUrl });
});

module.exports = router;
