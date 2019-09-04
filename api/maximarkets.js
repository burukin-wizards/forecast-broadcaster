const axios = require('axios');

async function maximarkets () {
    return await axios.get("https://informer.maximarkets.org/wss/signals/")
        .then(res => res.data)
        .catch(err => console.error(err));
}

module.exports = maximarkets;

