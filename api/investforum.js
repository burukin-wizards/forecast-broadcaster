const quoteIdForWidget = require('../constants/quoteIdForWidget');
const axios = require('axios');

function symbolToId (symbol) {
    for (let key in quoteIdForWidget) {
        if ( key === symbol) {
            return quoteIdForWidget[key];
        }
    }
    return null;
}

async function getRates(symbol) {
    const id = symbolToId(symbol);
    if (id){
        return await axios.get(`http://informer.investforum.ru/wss/server.ashx?id=${id}`)
            .then(res => res.data[0])
            .catch(err => console.error(err));
    }

}

module.exports = getRates;