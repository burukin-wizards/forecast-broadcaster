const {getValidSignals, getAccount} = require('./app');
const accData = require('./constants/accountsData');
const {initialArray,  expected, newSignalsArray} = require('./__mocks__/api/maximarkets');

jest.mock('./api/maximarkets', () => () => {
    const newSignals = {
        "test1": [
            {
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
                quality: 8,
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
            },
            {
                democandledelay: 101,
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
                resultuid: 111111111,
                direction: -1,
                stoploss: 1.741365,
                symbolcode: "EURNZD",
                initialtrend: 5,
                length: 42,
                volumeincrease: 10,
                completed: 1,
                quality: 8,
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
            }
        ]
    };
    return newSignals;
});

it ('should return unique object from new signals, that does exists in initial array', async () => {
    expect(await getValidSignals(initialArray)).toEqual(expected);
});

it ('should return all new objects when initial array is empty', async () => {
    expect(await getValidSignals([])).toEqual(newSignalsArray);
});

it ('should return empty array when initial array contains the same objects as new signals array', async () => {
    expect(await getValidSignals(newSignalsArray)).toEqual([]);
});

it ('should return first account from accData', async () => {
    const expected = getAccount();
    expect(expected.getNext()).toEqual(accData[0]);
});

it ('should return second account from accData', async () => {
    const expected = getAccount();
    expected.getNext();
    expect(expected.getNext()).toEqual(accData[1]);
});

