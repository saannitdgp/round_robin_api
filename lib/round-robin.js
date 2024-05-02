const axios = require('axios');
let currServers = require('./config.json').servers;

let currentServerIndex = 0;
const SERVER_NOT_AVAILABLE = 'NOT_FOUND';
const getNextAvailableServer = () => {
    let serverInfo = {
        status: SERVER_NOT_AVAILABLE
    }
    const currIndex = currentServerIndex;
    do {
        const currServer = currServers[currentServerIndex];
        if (currServer.healthy) {
            serverInfo = currServer;
            currentServerIndex = (currentServerIndex + 1) % currServers.length;
            console.log('target server:', JSON.stringify({ target: `http://${currServer.host}:${currServer.port}` }));
            break;
        }
        else {
            console.log("remove unheathy server: ", currServer);
            currServers.splice(currentServerIndex, 1);
            currentServerIndex = (currentServerIndex + 1) % currServers.length;
        }
    }
    while (currIndex != currentServerIndex);
    return serverInfo;

}
const roundRobin = async (req, res) => {
    const availableServerInfo = getNextAvailableServer();
    if (availableServerInfo.status != SERVER_NOT_AVAILABLE) {
        try {
            const requstConfig = {
                method: req.method,
                url: `http://${availableServerInfo.host}:${availableServerInfo.port}` + req.baseUrl,
                data: JSON.stringify(req.body),
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const result = await axios(requstConfig);
            res.statusCode = 200;
            res.send(result.data);
        } catch (err) {
            console.log(err);
            res.statusCode = 500;
            res.send('Failed to connect to backend');
        }
    }
    else {
        console.log(availableServerInfo);
        res.statusCode = 503;
        res.end('All servers are currently unavailable.');
    }
}
module.exports = roundRobin;
