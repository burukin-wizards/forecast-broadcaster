const quoteIdForWidget = require('../constants/quoteIdForWidget');
const _ = require('lodash');

function signalFilter (signal) {
    if (signal.quality >= 6) {
        if (_.isNumber(quoteIdForWidget[signal.symbol])) {
            return true;
        }
    }
    return false;
}

function findUniqueSignals (a, b) {
    const newSignalsArray = [];
    for (let i = 0; i < a.length; i++) {
        let match = false;
        for (let j = 0; j < b.length; j++) {
            if (a[i].resultuid === b[j].resultuid) {
                match = true;
                break;
            }
        }
        if (!match) {
            newSignalsArray.push(a[i]);
        }
    }
    return newSignalsArray;
}

module.exports = {
    signalFilter,
    findUniqueSignals
};