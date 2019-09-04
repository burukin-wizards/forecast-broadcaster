const getRates = require('./investforum');

jest.mock('./investforum');

it('should return true for argument test1 and expected 1', async () => {
    expect.assertions(1);
    return  getRates('test1').then(res => expect(res.data[0]).toEqual(1))
});

it('should return false for argument test2 and expected 1', async () => {
    expect.assertions(1);
    return  getRates('test2').then(res => expect(res.data[0]).not.toEqual(1))
});