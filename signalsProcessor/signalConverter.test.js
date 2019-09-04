const signalsConverter = require('./signalsConverter');

const testObject = {
    a: [{}],
    b: [{}]
};

test('transform object into array', () => {
    const expected = [{}, {}];
    expect(signalsConverter(testObject)).toEqual(expect.arrayContaining(expected));
});