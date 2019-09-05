const _ = require('lodash');

function signalValidator (signal) {
    if (!_.isEmpty(signal)) {
        const arrayOfStringFields = [
            'symbol',
            'patternimageurl',
            'pattern',
            'trend'
        ];
        const arrayOfNumberFields = [
            'direction',
            'predictiontimeto',
            'stoploss',
            'quality',
            'patternendtime',
            'predictionpricefrom',
            'resultuid'
        ];
        return _.every(arrayOfStringFields, value => !_.isEmpty(signal[value]) && _.isString(signal[value])) && _.every(arrayOfNumberFields, value => _.isNumber(signal[value]));
    }
    return false;
}

module.exports = signalValidator;