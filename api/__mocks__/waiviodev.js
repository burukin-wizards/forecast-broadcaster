const wobjects = {
    'test1': 1,
    'test2': 2
};

async function getWobjects(symbol) {
    return new Promise( (resolve, reject) => {
        resolve({data: wobjects[symbol]});
    });
}

module.exports = getWobjects;