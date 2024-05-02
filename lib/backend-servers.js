const express = require('express');
const http = require('http');
const bodyParser = require("body-parser")

const serverConfig = require('./config.json').servers;

const createNewServer = (host, port) => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/test', (req, res) =>{
        res.status(200).send(req.body);
    });
    app.server = http.createServer(function (req, res) {
        res.write('Hello World!');
        res.end();
      });
    app.listen(port, host, () => {
        console.log(`server running at http//:${host}:${port}`);
    })
};

serverConfig.forEach(server => {
    createNewServer(server.host, server.port);
});
