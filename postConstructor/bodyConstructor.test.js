const bodyConstructor = require('./bodyConstructor');

const validSignal = {
    quality: 1,
    patternendtime: 11,
    predictionpricefrom: 111,
    stoploss: 1111,
    patternimageurl: '1',
    pattern: '11',
    trend: '111'
};

const invalidSignal = {
    quality: 2,
    patternendtime: 11,
    predictionpricefrom: 111,
    stoploss: 1111,
    patternimageurl: '1',
    pattern: '11',
    trend: '111'
};

let time = new Date(Date.now()).getTime();
const period = Math.ceil(Math.abs(validSignal.patternendtime*1000 - time) / 1000 / 3600);

describe('check that body matches a string with input values', () => {
    const expected = `Technical analysis showed that [test-name](https://4cast.in/object/test-author-permlink) with a probability of 10% is necessary to open a deal for ${period} hours with:<center>Expected Rate: 111.</center><center>Proposition Stop Loss: 1111</center><center>![Figure](1)</center><center>Figure: 11, Trend: 111</center>***\n\nYou can open a deal and take profit on [4cast.in](https://4cast.in/)\nThis post contains [forecast for test-name](https://investarena.waiviodev.com/@test-author/test-permlink)`;
    it('should match', () => {
        expect(bodyConstructor(validSignal, 'test-name', 'test-author-permlink', 'test-author', 'test-permlink')).toMatch(expected);
    });

    it('should not match', () => {
        expect(bodyConstructor(invalidSignal, 'test-name', 'test-author-permlink', 'test-author', 'test-permlink')).not.toMatch(expected);
    });
});

