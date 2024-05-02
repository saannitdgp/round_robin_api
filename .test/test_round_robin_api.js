const axios = require('axios');

// Number of requests to send
const numRequests = 10;

const loadBalancerURL = 'http://localhost:3000/test';

const makeRequests = async () => {
    try {
        for (let i = 0; i < numRequests; i++) {
            const req = {
                method: 'post',
                url: loadBalancerURL,
                data: {
                        "game": "Mobile Legends",
                        "gamerID": "GYUTDTE",
                        "points": 20
                    },

            }
            const response = await axios(req);
            console.log(`Request ${i + 1} status: ${response.status} response: ${JSON.stringify(response.data)}`);
        }
    } catch (error) {
        console.error('Error making requests:', error.message);
    }
};

makeRequests();
