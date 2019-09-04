const postConstructor = require('./postConstructor');
const bodyConstructor = require('./bodyConstructor');
const permlinkConstructor = require('./permlinkConstructor');
const objectNameFinder = require('./objectNameFinder');

const testSignal1 = {
    direction: 1,
    predictiontimeto: 1111,
    symbol: 'test-symbol',
    stoploss: 111,
    patternendtime: 0,
    predictionpricefrom: 0,
    patternimageurl: 0,
    pattern: 'test-pattern',
    trend: 'test-trend',
    resultuid: 0
};
const testSignal2 = {
    direction: -1,
    predictiontimeto: 1111,
    symbol: 'test-symbol',
    stoploss: 111,
    patternendtime: 0,
    predictionpricefrom: 0,
    patternimageurl: 0,
    pattern: 'test-pattern',
    trend: 'test-trend',
    resultuid: 0
};

const testRate = {
    Market: 'test-market',
    CurrentValue: 100
};

const testWobject = {
    "_id": "5cb0b88af03c2c421e58241d",
    "author_permlink" : "cur-eurczk",
    "fields": [
        {
            "weight": 1,
            "locale": "en-US",
            "_id": "5cb0b88cf03c2c421e582d12",
            "creator": "wiv01",
            "author": "x6oc5",
            "permlink": "wiv01-5eemagaqn47",
            "name": "name",
            "body": "eurczk",
            "active_votes": []
        },
        {
            "weight": 1,
            "locale": "en-US",
            "_id": "5cb0b8a7f03c2c421e58ac73",
            "creator": "wiv01",
            "author": "sor31",
            "permlink": "rmk-eurczk-chartid",
            "name": "chartid",
            "body": "EURCZK",
            "active_votes": []
        },
        {
            "weight": 1,
            "locale": "en-US",
            "_id": "5cb0b8a8f03c2c421e58ad98",
            "creator": "wiv01",
            "author": "vmn31",
            "permlink": "tyt-eurczk-tag",
            "name": "tag",
            "body": "eurczk",
            "active_votes": []
        },
        {
            "weight": 1,
            "locale": "en-US",
            "_id": "5cb0b8a9f03c2c421e58afe7",
            "creator": "wiv01",
            "author": "wiv01",
            "permlink": "xem-eurczk-tag",
            "name": "tag",
            "body": "eur-czk",
            "active_votes": []
        },
        {
            "weight": 1,
            "locale": "en-US",
            "_id": "5cb0b8abf03c2c421e58b3f2",
            "creator": "wiv01",
            "author": "w7ngc",
            "permlink": "znq-eurczk-parent",
            "name": "parent",
            "body": "abc-eur",
            "active_votes": []
        },
        {
            "weight": 1,
            "locale": "en-US",
            "_id": "5cb0b8acf03c2c421e58b8a9",
            "creator": "wiv01",
            "author": "x6oc5",
            "permlink": "bre-eurczk-parent",
            "name": "parent",
            "body": "abc-czk",
            "active_votes": []
        },
        {
            "weight": 1,
            "locale": "en-US",
            "_id": "5cb0b8aff03c2c421e58c2ad",
            "creator": "wiv01",
            "author": "sor31",
            "permlink": "rig-eurczk-title",
            "name": "title",
            "body": "Euro/Czech koruna",
            "active_votes": []
        },
        {
            "weight": 1,
            "locale": "en-US",
            "_id": "5cb0b8b1f03c2c421e58cbe8",
            "creator": "wiv01",
            "author": "vmn31",
            "permlink": "shu-eurczk-description",
            "name": "description",
            "body": "A currency pair is the quotation of the relative value of a currency unit against the unit of another currency in the foreign exchange market.",
            "active_votes": []
        },
        {
            "weight": 1,
            "locale": "en-US",
            "_id": "5cb0b8b3f03c2c421e58cd79",
            "creator": "wiv01",
            "author": "wiv01",
            "permlink": "ool-eurczk-avatar",
            "name": "avatar",
            "body": "https://waivio.nyc3.digitaloceanspaces.com/1562259445_662e399b-b1ec-44d2-9d57-b3e611f05533",
            "active_votes": []
        },
        {
            "weight": 1,
            "locale": "en-US",
            "_id": "5cb0b8b4f03c2c421e58cf8c",
            "creator": "wiv01",
            "author": "w7ngc",
            "permlink": "wuu-eurczk-background",
            "name": "background",
            "body": "https://waivio.nyc3.digitaloceanspaces.com/1562317171_41f372cb-de4c-4399-b28d-e4ed3dda7dd5",
            "active_votes": []
        },
        {
            "weight": 2,
            "locale": "en-US",
            "_id": "5cb46ce8f03c2c421efa7659",
            "creator": "wiv01",
            "author": "sor31",
            "permlink": "cur-eurczk",
            "name": "name",
            "body": "EUR/CZK",
            "active_votes": []
        },
        {
            "weight": 0,
            "locale": "en-US",
            "_id": "5ce3d5968ca3d0463366fb26",
            "creator": "wiv01",
            "author": "an98r",
            "permlink": "grc-eurczk-filter",
            "name": "newsFilter",
            "body": "{\"allowList\":[\n[\"eurczk\",\"money\"],\n[\"eurczk\",\"currancy\"],\n[\"eurczk\",\"currancies\"], \n[\"eurczk\",\"trade\"], \n[\"eurczk\",\"trading\"], \n[\"eurczk\",\"news\"]],\n[\"cnh\",\"money\"],\n[\"cnh\",\"currancy\"],\n[\"cnh\",\"currancies\"], \n[\"cnh\",\"trade\"], \n[\"cnh\",\"trading\"], \n[\"cnh\",\"news\"]],\t\n\"ignoreList\":[\n\"photography\",\n\"food\",\n\"art\",\n\"blog\",\n\"partiko\",\n\"travel\",\n\"gaming\",\n\"actifit\",\n\"nature\",\n\"funny\",\n\"steemmonsters\",\n\"dw\",\n\"fight\",\n\"music\",\n\"photo\",\n\"artzone\",\n\"cats\"]}",
            "active_votes": []
        },
        {
            "weight": 1,
            "locale": "en-US",
            "_id": "5ce6a526be601c180cb8458f",
            "creator": "wiv01",
            "author": "xcv47",
            "permlink": "bbr-eurczk-filter",
            "name": "newsFilter",
            "body": "{\"allowList\":[[\"eurczk\",\"money\"],[\"eurczk\",\"currancy\"],[\"eurczk\",\"currancies\"], [\"eurczk\",\"trade\"], [\"eurczk\",\"trading\"], [\"eurczk\",\"news\"],[\"cnh\",\"money\"],[\"cnh\",\"currancy\"],[\"cnh\",\"currancies\"], [\"cnh\",\"trade\"], [\"cnh\",\"trading\"], [\"cnh\",\"news\"]],\t\"ignoreList\":[\"photography\",\"food\",\"art\",\"blog\",\"partiko\",\"travel\",\"gaming\",\"actifit\",\"nature\",\"funny\",\"steemmonsters\",\"dw\",\"fight\",\"music\",\"photo\",\"artzone\",\"cats\"]}",
            "active_votes": []
        }
    ]};

const objectName = objectNameFinder(testWobject);
const permlink = permlinkConstructor(0);
const body = bodyConstructor(testSignal1, objectName, testWobject.author_permlink, 'test-author', permlink);
const createdAt = new Date(Date.now());
const expiredAt = new Date(testSignal1.predictiontimeto * 1000);

test( 'check if the constructed objects equals to expected object', () => {
    const expectedObject ={
        author: 'test-author',
        parent_author: '',
        body,
        permlink,
        parent_permlink: 'wtrade',
        json_metadata: JSON.stringify({
            community: 'waivio',
            app: '4cast.in',
            format: 'markdown',
            tags: '4cast',
            users: [],
            image: ['https://miro.medium.com/max/1024/1*AYsEF4mKmp28JGfQvFhrRQ.png'],
            wobj: {
                wobjects: [
                    {
                        objectName: 'EUR/CZK',
                        author_permlink: 'cur-eurczk',
                        percent: 100
                    }
                ]
            },
            wia: {
                quoteSecurity: 'test-symbol',
                marker: 'test-market',
                recommend: 'Buy',
                postPrice: parseInt(testRate.CurrentValue, 10),
                expiredAt,
                isValid: true,
                slPrice: 111
                //createdAt: createdAt.toISOString()
            },
        }),
        title: `Buy opportunity detected from EUR/CZK`
    };
    expect(postConstructor(testSignal1, testRate, testWobject, 'test-author')).toStrictEqual(expectedObject);
});

test( 'check if the constructed objects equals to expected object', () => {
    const expectedObject ={
        author: 'test-author',
        parent_author: '',
        body,
        permlink,
        parent_permlink: 'wtrade',
        json_metadata: JSON.stringify({
            community: 'waivio',
            app: '4cast.in',
            format: 'markdown',
            tags: '4cast',
            users: [],
            image: ['https://miro.medium.com/max/1024/1*AYsEF4mKmp28JGfQvFhrRQ.png'],
            wobj: {
                wobjects: [
                    {
                        objectName: 'EUR/CZK',
                        author_permlink: 'cur-eurczk',
                        percent: 100
                    }
                ]
            },
            wia: {
                quoteSecurity: 'test-symbol',
                marker: 'test-market',
                recommend: 'Sell',
                postPrice: parseInt(testRate.CurrentValue, 10),
                expiredAt,
                isValid: true,
                slPrice: 111,
                createdAt: createdAt.toISOString()
            },
        }),
        title: `Sell opportunity detected from EUR/CZK`
    };
    expect(postConstructor(testSignal2, testRate, testWobject, 'test-author')).toStrictEqual(expectedObject);
});




