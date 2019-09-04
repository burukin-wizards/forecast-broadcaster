const quoteIdForWidget = {
    'test1': [1],
    'test2': [2]
};

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
        return new Promise( (resolve, reject) => {
            resolve({data: quoteIdForWidget[symbol]})
        })
    }
}

module.exports = getRates;