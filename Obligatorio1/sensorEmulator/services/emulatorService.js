const env = require('../config/env');
const axios = require('axios');

module.exports = {
    async emulateSensorData(data) {
        let url = env.URL_GATEWAY;
        let port = env.PORT_GATEWAY;

        const allTasks = data.map(info => {
                return sendData(info,url,port)
        });

        Promise.all(allTasks);
    }    
}

async function sendData(info,url,port){
    axios.post(`http://${url}:${port}/gateway/observation/${info.ESN}`, {
        name: info.name,
        unit: info.unit,
        value: info.value
    })
        .then(res => {
            console.log(res.data);
        })
        .catch(error => {
            if (!!error.response)
                console.log({ error: error.response.data, req: info.toObject() });
            else
                console.log(error);
        })
    }
