import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (request, file, cb) {
        cb(null, '../back-end/uploads');
    },
    filename: function (request, file, cb) {
        cb(null, `${file.originalname}`);
        const ext = file.originalname.split('.').pop();
        
    }
});

const uploadFile = multer({ storage: storage});

export { uploadFile };
