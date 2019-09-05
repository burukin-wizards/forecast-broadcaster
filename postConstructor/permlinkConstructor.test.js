const permlinkConstructor = require('./permlinkConstructor');

describe('check permlink', () => {
    const expected = /\w{5,10}/;

    it('match if permlink does not matches /[0-9a-z]{7,}/ expression', () => {
        expect(permlinkConstructor(4)).toMatch(expected);
    });
});