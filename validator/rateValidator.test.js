const rateValidator = require('./rateValidator');

function rateGen ( Market = 'test', CurrentValue = 'test') {
    return {
        Market,
        CurrentValue
    }
};

describe('rate validator of emptiness of Market and/or CurrentValue', () => {
    it.each([
        [{}, false],
        [rateGen('', ''), false],
        [rateGen('test', ''), false],
        [rateGen('', 'test'), false],
        [rateGen(), true]
    ])(`for  %o should return true of false`, (value, expected) => {
        expect(rateValidator(value)).toEqual(expected);
    });
});