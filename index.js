const express = require('express');
const multer = require('multer');
const path = require('path');
const PORT = 5000;

const app = express();



app.use(express.static(path.join(__dirname, 'public')));


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});



const upload = multer({ storage: storage });




app.use('/uploads', express.static('uploads'));



app.post('/profile', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    res.send(`File uploaded successfully: <a href="/uploads/${req.file.filename}">${req.file.filename}</a>`);
});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
