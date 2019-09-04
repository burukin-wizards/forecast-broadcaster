const wobjectsValidator = require('./wobjectValidator');

function wobjGen (author_permlink = 'test', name = 'name', body='test' ) {
    return {
        author_permlink : author_permlink,
        fields: [{ weight: 1, name, body}, { weight: 2, name, body}]
    }
}

describe('wobject validator for not empty author_permlink, name = name, and ', () => {
    it.each([
        [{}, false],
        [wobjGen('test', null, null), false],
        [wobjGen(null, 'test', null), false],
        [wobjGen(null, null, 'test'), false],
        [wobjGen(null), false],
        [wobjGen('test', 'name', null), false],
        [wobjGen('test', null, 'test'), false],
        [wobjGen(null, null, null), false],
        [wobjGen(), true]
    ])('for validating %o should return true of false', (value, expected) => {
        expect(wobjectsValidator(value)).toEqual(expected);
    });
});

////IMPLEMENTATION USING JASMINE////

// describe("wobject validation", function() {
//     using([ wobjGen() ], function(value){
//         it("should return true for valid wobject", function() {
//             expect(wobjectsValidator(value)).toBeTruthy();
//         })
//     });
//
//     using([
//         wobjGen(null),
//         wobjGen('test', null),
//         wobjGen('test', 'name', null)
//     ], function(value){
//         it("should return false for invalid wobject", function() {
//             expect(wobjectsValidator(value)).toBeFalsy();
//         })
//     })
// });

