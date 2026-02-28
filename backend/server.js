const http = require('http');

const server = http.createServer((req, res) => {
    console.log("REQUEST MADE")
});

server.listen(3000, 'localhost', () => {
    console.log("listening")
})


