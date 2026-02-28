const express = require('express');
const cors = require('cors');
const path = require('path')
const app = express();

// Allow requests from Ionic frontend
app.use(cors({
    origin: 'http://localhost:8100',
    methods: ['GET','POST','PUT','DELETE'],
    credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/www/index.html'));
});

app.listen(3000, () => console.log('Backend running on port 3000'));
