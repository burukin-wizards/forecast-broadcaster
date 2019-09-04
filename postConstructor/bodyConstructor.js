function bodyConstructor (signal, name, author_permlink, author_name, permlink) {
    const {
        quality,
        patternendtime,
        predictionpricefrom,
        stoploss,
        patternimageurl,
        pattern,
        trend
    } = signal;

    let time = new Date(Date.now()).getTime();
    const period = Math.ceil(Math.abs(patternendtime*1000 - time) / 1000 / 3600);

    return `Technical analysis showed that [${name}](https://4cast.in/object/${author_permlink}) with a probability of ${quality}0% is necessary to open a deal for ${period} hours with:<center>Expected Rate: ${predictionpricefrom}.</center><center>Proposition Stop Loss: ${stoploss}</center><center>![Figure](${patternimageurl})</center><center>Figure: ${pattern}, Trend: ${trend}</center>***\n\nYou can open a deal and take profit on [4cast.in](https://4cast.in/)\nThis post contains [forecast for ${name}](https://investarena.waiviodev.com/@${author_name}/${permlink})`;
}


module.exports = bodyConstructor;