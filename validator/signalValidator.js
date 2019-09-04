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
        // if(!_.isEmpty(direction) && !_.isEmpty(predictiontimeto) && !_.isEmpty(symbol) && !_.isEmpty(stoploss) && !_.isEmpty(quality) && !_.isEmpty(patternendtime) && !_.isEmpty(predictionpricefrom) && !_.isEmpty(patternimageurl) && !_.isEmpty(pattern) && !_.isEmpty(trend) && !_.isEmpty(resultuid)) {
        //     if(_.isNumber(direction) && _.isNumber(predictiontimeto) && _.isString(symbol) && _.isNumber(stoploss) && _.isNumber(quality) && _.isNumber(patternendtime) && _.isNumber(predictionpricefrom) && _.isString(patternimageurl) && _.isString(pattern) && _.isString(trend) && _.isNumber(resultuid)) {
        //         return true;
        //     }
        // }
    }
    return false;
}

module.exports = signalValidator;