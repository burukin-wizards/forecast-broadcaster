const axios = require ('axios');

async function getWobjects(symbol) {
        return await axios.get(`https://waiviodev.com/api/wobjectsByField`, {
            params: {
                fieldName: "chartid",
                fieldBody: symbol
            }
        })
            .then(res => res.data[0])
            .catch(err => console.error(err));
}

module.exports = getWobjects;