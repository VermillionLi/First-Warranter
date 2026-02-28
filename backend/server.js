const express = require('express');
const cors = require('cors');
const multer = require('multer');
const app = express();
const {template} = require("./API_functions");
const {testImage} = require("./API_functions")
const upload = multer({ dest: 'uploads/' });

// Allow requests from Ionic frontend
app.use(cors({
    origin: 'http://localhost:8100',
    methods: ['GET','POST','PUT','DELETE'],
    credentials: true
}));

app.use(express.json());

app.post('/api/upload', upload.array('images'), (req, res) => {
  console.log('Received files:', req.files);
  res.json({ message: 'Files uploaded successfully!', count: req.files.length });
});

app.get('/', (req, res) => {
    res.status(200).send({
        "message" : "test successful"
    })
});

app.get('/useAI', async (req, res) => {
    const data = await template()
    res.status(200).send(data)
})

app.listen(3000, () => console.log('Backend running on port 3000'));

app.get('/testImage', async (req, res) => {
    const data = await testImage()
    res.status(200).send(data)
})