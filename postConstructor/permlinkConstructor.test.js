const permlinkConstructor = require('./permlinkConstructor');

describe('check permlink', () => {
    const expected = /[0-9a-z]{9,}/;

    it('match if permlink does not matches /[0-9a-z]{7,}/ expression', () => {
        expect(permlinkConstructor(0)).not.toMatch(expected);
    });

    it('match if permlink matches /[0-9a-z]{7,}/ expression', () => {
        expect(permlinkConstructor(3)).toMatch(expected);
    });
});