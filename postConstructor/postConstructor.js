const ObjectId = require( 'mongoose' ).Types.ObjectId;
const _ = require('lodash');

const postData = require('../constants/postData');
const bodyConstructor = require('./bodyConstructor');
const permlinkConstructor = require('./permlinkConstructor');
const objectNameFinder = require('./objectNameFinder');



function  postConstructor (signal, rate, wobject, author_name, date = Date.now(), permlinkLength=5 ) {
    const buySell = signal.direction === 1 ? 'Buy' : 'Sell';
    const objectName = objectNameFinder(wobject);
    const permlink = permlinkConstructor(permlinkLength);
    const body = bodyConstructor(signal, objectName, wobject.author_permlink, author_name, permlink);
    const createdAt = new Date(date);
    const expiredAt = new Date(signal.predictiontimeto * 1000);

    return {
        author: author_name,
        parent_author: '',
        body: body,
        permlink,
        parent_permlink: 'wtrade',
        json_metadata: JSON.stringify({
            community: 'waivio',
            app: '4cast.in',
            format: 'markdown',
            tags: '4cast',
            users: [],
            image: [postData.json_metadata.image],
            wobj: {
                wobjects: [
                    {
                        objectName: objectName,
                        author_permlink: wobject.author_permlink,
                        percent: 100
                    }
                ]
            },
            wia: {
                quoteSecurity: signal.symbol,
                marker: rate.Market,
                recommend: buySell,
                postPrice: parseInt(rate.CurrentValue, 10),
                expiredAt,
                isValid: true,
                slPrice: signal.stoploss,
                createdAt: createdAt.toISOString()
            },
        }),
        title: `${buySell} opportunity detected from ${objectName}`
    };
};

module.exports = postConstructor;