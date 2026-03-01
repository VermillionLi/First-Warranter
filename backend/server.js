const express = require('express');
const cors = require('cors');
const multer = require('multer');
const app = express();
const {template, testImage, generateDescriptions} = require("./Gemini_API");
const {extname, join} = require("node:path");
const { readdir, unlink, access , mkdir} = require('fs/promises');
const e = require("express");
const {askRAG} = require("./Ollama_API");
let imageNumber = 0

// Allow requests from Ionic frontend

app.use(cors({
    origin: 'http://localhost:8100',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());

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
            const files = await readdir('uploads/');
            await Promise.all(
                files.map(file =>
                    unlink(join('uploads/', file))
                )
            );
    }else{
        await mkdir(join(__dirname, 'uploads/'))
    }
}

//upload folder functions

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


//api handling
app.post(
    '/api/upload',
    async (req, res, next) => {
        try{
            await sanitize_upload_folder();
            imageNumber = 0;
            next();
        }catch(err){
            res.status(500).json({error: "deletion of previous images failed"})
            console.log(err)
        }
    },
    upload.array('images'),
    async (req, res) => {
        console.log('Received files:', req.files);
        let model_response = await generateDescriptions();
        if (typeof model_response === 'string') {
        model_response = model_response
        .replace(/```(?:json)?\n?/g, '') // remove starting ```json or ```
        .replace(/```/g, '')             // remove ending ```
        .trim();
        }

        res.status(200).json({
            message: 'Files uploaded successfully!',
            count: req.files.length,
            model_response: model_response
        });
    }
);


app.get('/', (req, res) => {
    res.status(200).send({
        "message": "test successful"
    })
});

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


app.listen(3001, () => console.log('Backend running on port 3001'));

//server communicate to Gemini

app.get('/testImage', async (req, res) => {
    const data = await testImage()
    res.status(200).send(data)
});

app.get('/testMultipleImages', async (req, res) => {
    const data = await generateDescriptions()
    res.status(200).send(data)
});


app.get('/testRAG', async (req, res) => {
    const data = await askRAG("pool, quite large, circular, with slide")
    res.status(200).send(data)
});


app.get('/testPipeline', async (req, res) => {
    let img_disc = await generateDescriptions()
    if (typeof img_disc === 'string') {
      img_disc = img_disc
        .replace(/```(?:json)?\n?/g, '') // remove starting ```json or ```
        .replace(/```/g, '')             // remove ending ```
        .trim();
      img_disc = JSON.parse(img_disc);
    }
    console.log('Parsed descriptions:', img_disc);
    let result = []
    for (const key in img_disc) {
      if (img_disc.hasOwnProperty(key)) {
        const disc = img_disc[key];
        console.log(disc)
        const price = await askRAG(disc)
        console.log('price', price)
        result.push(price)
      }
    }
    res.status(200).send(result)
});

//full pipeline:
app.get('/api/calculate', async (req, res) => {
    const disc = req.body;
    console.log(disc)
    const price = await askRAG(disc)
    console.log('price', price)
    res.status(200).send(price)
});





