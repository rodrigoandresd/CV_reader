import multer from 'multer';

// Create a new multer storage instance
const storage = multer.diskStorage({
    // Specify the destination directory for uploaded files
    destination: function (request, file, cb) {
        cb(null, '../back-end/uploads');
    },
    // Specify the filename for uploaded files
    filename: function (request, file, cb) {
        // Use the original filename of the uploaded file
        cb(null, `${file.originalname}`);
        // Get the file extension
        const ext = file.originalname.split('.').pop();
    }
});

// Create a new multer instance using the storage configuration
const uploadFile = multer({ storage: storage});

// Export the uploadFile middleware for use in other modules
export { uploadFile };
