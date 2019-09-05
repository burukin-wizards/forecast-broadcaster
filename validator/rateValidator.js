const _ = require('lodash');

function rateValidator (rate) {
    const arrayOfFields = [
        'Market',
        'CurrentValue'
    ];
    return !_.isEmpty(rate) && _.every(arrayOfFields, value => !_.isEmpty(rate[value]) && _.isString(rate[value]));
}

module.exports = rateValidator;