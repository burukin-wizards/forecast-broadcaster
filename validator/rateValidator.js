const _ = require('lodash');

function rateValidator (rate) {
    const arrayOfFields = [
        'Market',
        'CurrentValue'
    ];

    if (!_.isEmpty(rate)) {
        return _.every(arrayOfFields, value => !_.isEmpty(rate[value]) && _.isString(rate[value]));

        // const {Market, CurrentValue} = rate;
        // if (!_.isEmpty(Market) && !_.isEmpty(CurrentValue) && _.isString(Market) && _.isString(CurrentValue)) {
        //     return true;
        // }
    }
    return false;
}

module.exports = rateValidator;