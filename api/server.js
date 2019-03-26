require('dotenv').config();

const port = process.env.PORT;

const http = require('http'),
    app = require('./config/express');

const server = http.createServer(app);

server.listen(port, () => console.log(`Server listening at ${port}`));