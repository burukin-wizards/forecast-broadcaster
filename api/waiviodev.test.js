const waiviodev = require('./waiviodev');

jest.mock('./waiviodev');

it('should return true for argument test1 and expected 1', async () => {
    expect.assertions(1);
    return  waiviodev('test1').then(res => expect(res.data).toEqual(1))
});

it('should return false for argument test2 and expected 1', async () => {
    expect.assertions(1);
    return  waiviodev('test2').then(res => expect(res.data).not.toEqual(1))
});