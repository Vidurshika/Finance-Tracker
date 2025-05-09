const multer = require('multer'); //Multer, a Node.js library that handles file uploads (like images, PDFs, etc.).

//configure storage
const storage = multer.diskStorage({ //multer.diskStorage(...) tells Multer: “Store files on my disk (computer)
    destination: (req,file,cb) => {
        cb(null, 'uploads/'); //cb means "callback" — you're telling Multer: "No error (null) and store it in uploads folder
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
    /*creates a unique name for each file.Date.now() gives the current timestamp (like 1715179874210).
      ${file.originalname} is the original name of the uploaded file.So name = time-prev name

 */
});

//file filter
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg','image/png','image/jpg'];//checks the file's type, not the file's name, name could be anything
    if(allowedTypes.includes(file.mimetype)){
        cb(null,true); //cb(null, true) → This file is allowed, save it.
    } else {
        cb(new Error('Only .jpeg, .jpg and .png formats are allowed'), false);
    }
};

const upload = multer({ storage, fileFilter}); //This tells Multer how to save and check the files.
/* what this mware does => Stores the uploaded files on your local disk (computer).
                           Checks the file type to make sure only images with .jpeg, .jpg, or .png extensions are uploaded.
*/

module.exports = upload;