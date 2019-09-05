const signalValidator = require('./signalValidator');

const incorrectSignal = {
        democandledelay: 0,
        symbol: 'EURAUD',
        patternimageurl: 'https://maxiforex.autochartist.com//aclite/imageViewer?type=CPPatternImage&uid=620674885&brokerid=511&w=480&h=275&&priceadjustment=0.0&instrumentid=0&showprf=0&offset=0.0',
        trend: 'Continuation',
        pattern: 'Falling Wedge',
        uniformity: 7,
        resistancex1: 1567500300,
        resistancex0: 1567484100,
        supportx0: 1567494000,
        demominutedelay: 0,
        supportx1: 1567503000,
        timezoneoffset: 0,
        patternendtime: 1567504800,
        resultuid: 620674885,
        direction: 1,
        stoploss: 1.626185,
        symbolcode: 'EURAUD',
        initialtrend: 6,
        length: 22,
        volumeincrease: 3,
        completed: 0,
        quality: 7,
        relevant: 1,
        resistancey0: 1.63455,
        resistancey1: 1.62895,
        clarity: 8,
        supporty1: 1.626185,
        clickthroughurl: 'https://maxiforex.autochartist.com/aclite/MaxiForexMain?apilogintoken=KGJ2FlUsw4Ip95%2FDJ%2FpTl1oLT0U4ZXl%2F&cpresultuid=620674885&rm=1',
        supporty0: 1.62665,
        exchange: 'MAXI',
        interval: 15,
        age: 0
};


function signalGen ( stringData, numberData) {
    return {
        direction: numberData,
        predictiontimeto: numberData,
        symbol: stringData,
        stoploss: numberData,
        quality: numberData,
        patternendtime: numberData,
        predictionpricefrom: numberData,
        patternimageurl: stringData,
        pattern: stringData,
        trend: stringData,
        resultuid: numberData
    }
};

const correctSignal = {
    democandledelay: 0,
    symbol: "EURNZD",
    patternimageurl: "https://maxiforex.autochartist.com//aclite/imageViewer?type=CPPatternImage&uid=620682082&brokerid=511&w=480&h=275&&priceadjustment=0.0&instrumentid=0&…20 more…",
    predictionpriceto: 1.7363,
    trend: "Reversal",
    pattern: "Head and Shoulders",
    uniformity: 4,
    predictionpricefrom: 1.7351,
    predictiontimeto: 1567529100,
    resistancex1: 1567500300,
    resistancex0: 1567472400,
    supportx0: 1567474200,
    demominutedelay: 0,
    supportx1: 1567497600,
    predictiontimefrom: 1567511100,
    timezoneoffset: 0,
    patternendtime: 1567511100,
    resultuid: 620682082,
    direction: -1,
    stoploss: 1.741365,
    symbolcode: "EURNZD",
    initialtrend: 5,
    length: 42,
    volumeincrease: 10,
    completed: 1,
    quality: 5,
    relevant: 1,
    resistancey0: 1.74068,
    breakout: 1,
    resistancey1: 1.741365,
    clarity: 9,
    supporty1: 1.737125,
    clickthroughurl: "https://maxiforex.autochartist.com/aclite/MaxiForexMain?apilogintoken=KGJ2FlUsw4Ip95%2FDJ%2FpTl1oLT0U4ZXl%2F&cpresultuid=620682082&rm=1",
    supporty0: 1.737115,
    exchange: "MAXI",
    interval: 15,
    age: 1
};

describe('signal validator of emptiness fitness of data types', () => {
    it.each([
        [{}, false],
        [signalGen(undefined, 1010), false],
        [signalGen('test', undefined), false],
        [signalGen('test', 'test'), false],
        [signalGen(1010, 1010), false],
        [signalGen('test', 1010), true]
        // [incorrectSignal, false],
        // [correctSignal, true]
    ])(`for  %o should return true of false`, (value, expected) => {
        expect(signalValidator(value)).toEqual(expected);
    });
});