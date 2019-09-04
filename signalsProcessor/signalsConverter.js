function signalsConverter(signalsObject) {
    let array =[];
    for (let key in signalsObject) {
        array = array.concat(signalsObject[key]);
    }
    return array;
}

module.exports = signalsConverter;