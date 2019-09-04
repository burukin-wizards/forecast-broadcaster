const {findUniqueSignals, signalFilter} = require('./signalsProcessor');

function objGen (uid1=0, uid2=1, symbol1 = '', symbol2 = '', quality1='0', quality2 = '0') {
    return [
        {resultuid: uid1, symbol: symbol1, quality: quality1},
        {resultuid: uid2, symbol: symbol2, quality: quality2}
    ];
}

describe('looks for unique objects in array according to field resultuid', () => {
    it.each([
        [objGen(), [] ],
        [objGen(0,0,'AUDCAD', '', 0, 8), []],
        [objGen(0,0,'AUDCAD', '', 8, 0), [ objGen(0,0,'AUDCAD', '', 8, 0)[0] ]],
        [objGen(0,0,'AUDCAD', 'AUDCHF', 8, 8),  objGen(0,0,'AUDCAD', 'AUDCHF', 8, 8) ]
    ])(`for  %o should return true of false`, (value, expected) => {
        expect(value.filter( item => signalFilter(item))).toEqual(expected);
    });
});

describe('looks for objects wich have id qaulity >= 7', () => {
    it.each([
        [objGen(), objGen(), [] ],
        [objGen( ), objGen(0, 3), [ objGen(0, 3)[1] ] ]
    ])(`for  %o should return true of false`, (value1, value2, expected) => {
        expect(findUniqueSignals(value2, value1)).toEqual(expected);
    });
});
