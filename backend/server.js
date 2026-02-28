const http = require('http');

const server = http.createServer((req, res) => {
    console.log("REQUEST MADE")
    res.setHeader('Content-Type', '')
});

server.listen(3000, 'localhost', () => {
    console.log("listening")
})


