const http = require('http');
const express = require('express');
const bodyParser = require('body-parser')
const roundRobin = require('./round-robin');

const port = 3000;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.server = http.createServer(app);
app.use('*', (req, res) => {
  roundRobin(req, res);
});

app.listen(port, () => {
     console.log(`load balancer server is running on ${port}`);
});