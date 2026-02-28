const express = require('express');
const cors = require('cors');
const multer = require('multer');
const app = express();
const {template} = require("./API_functions");
const {testImage} = require("./API_functions")
const {extname, join} = require("node:path");
const { readdir, unlink, access , mkdir} = require('fs/promises');
let imageNumber = 0

//upload folder deleter function:

async function folderExists(path) {
    try {
        await access(path);
        return true;  // Folder exists
    } catch {
        return false; // Folder does not exist
    }
}

async function sanitize_upload_folder() {
    if (await folderExists('uploads/')){
        try {
            const files = await readdir('uploads/');
            await Promise.all(
                files.map(file =>
                    unlink(join('uploads/', file))
                )
            );
        } catch (err) {
            console.error(err);
            throw err;
        }
    }else{
        await mkdir(join(__dirname, 'uploads/'))
    }
}


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory to save files
    },
    filename: (req, file, cb) => {
        const ext = extname(file.originalname); // Preserve original extension
        cb(null, `${imageNumber}${ext}`); // Unique filename
        imageNumber++
    }
});

const upload = multer({storage});

app.post(
    '/api/upload',
    async (req, res, next) => {
        try{
            await sanitize_upload_folder();
            imageNumber = 0;
            next();
        }catch(err){
            res.status(500).json({error: "deletion of previous images failed"})
        }
    },
    upload.array('images'),
    (req, res) => {
        console.log('Received files:', req.files);
        res.json({
            message: 'Files uploaded successfully!',
            count: req.files.length
        });
    }
);


app.get('/', (req, res) => {
    res.status(200).send({
        "message": "test successful"
    })
});
// Allow requests from Ionic frontend

    app.use(cors({
        origin: 'http://localhost:8100',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true
    }));

    app.use(express.json());

    app.get('/useAI', async (req, res) => {
        const data = await template()
        res.status(200).send(data)
    })

    app.listen(3000, () => console.log('Backend running on port 3000'));

    app.get('/testImage', async (req, res) => {
        const data = await testImage()
        res.status(200).send(data)
    });

