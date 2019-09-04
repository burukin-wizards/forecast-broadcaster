const {PrivateKey} = require('dsteem');
const _ = require('lodash');
const {CronJob} = require('cron');

const {getSignals, getRates, getWobjects} = require('./api/index');
const {signalsConverter, signalsProcessor} = require('./signalsProcessor');
const {postConstructor} = require('./postConstructor');
const {postBroadcaster} = require('./postBroadcaster');
const {signalValidator, rateValidator, wobjectValidator} = require('./validator');
const accountsData = require('./constants/accountsData');

const botsAcc = (function () {
    let index = 0;
    const accData = accountsData;
    const length = accountsData.length;

    return {
        getNext: function () {
            let account;
            if (!this.hasNext()) {
                this.resetIndex();
            }
            account = accData[index];
            index = index + 1;
            return account;
        },
        hasNext: function () {
            return index < length;
        },
        resetIndex: function () {
            index = 0;
        },
    };
}());

var signalsInitialArray;

async function getValidSignals() {
    try {
        const newSignals = await getSignals();
        const newSignalsArray = signalsConverter(newSignals);

        return signalsProcessor.findUniqueSignals(newSignalsArray, signalsInitialArray)
            .filter(signal => signalsProcessor.signalFilter(signal))
            .filter(signal => signalValidator(signal));
    } catch (e) {
        console.error(e);
    }
}

async function createAndBroadcastPost(filteredSignalsArray) {
    this.attempts = this.attempts < accountsData.length ? this.attempts + 1 : 1;
    try {
        let botAcc = botsAcc.getNext();
        const latestSignal = filteredSignalsArray.reduce((max, signal) => max.resultuid > signal.resultuid ? max : signal);
        const rate = await getRates(latestSignal.symbol);
        const validRate = rateValidator(rate) && rate;
        const wobject = await getWobjects(latestSignal.symbol);
        const validWobject = wobjectValidator(wobject) && wobject;
        const post = postConstructor(latestSignal, validRate, validWobject, botAcc.name);
        const transactionStatus = await postBroadcaster(post, PrivateKey.fromString(botAcc.postingKey));
        if (transactionStatus) {
            console.log(post);
            console.log(`Object type successfully broadcasted. Transaction ID: ${transactionStatus.id}, author: ${botAcc.name}`);
            this.attempts = 0;
        }
    } catch (e) {
        if (e.name === 'RPCError' && this.attempts < accountsData.length) {
            console.warn(`ERR[CreateObjectType] RPCError: ${e.message}`);
            await createAndBroadcastPost.call(this, filteredSignalsArray);
        } else {
            console.error(e);
        }
    }
}

setTimeout(async () => {
    try {
        const initialSignals = await getSignals();
        signalsInitialArray = signalsConverter(initialSignals)
            .filter(signal => signalValidator(signal))
            .filter(signal => signalsProcessor.signalFilter(signal));

        console.log('initial signals length', signalsInitialArray.length);
    } catch (e) {
        console.error(e);
    }
}, 0);

const job = new CronJob('0 0 8-22/2 * * *', async () => {
    (async () => {
        for (let i = 0; i < 20; i++) {
            console.log('Looking for a new signals...');
            let validSignalsArray = await getValidSignals();
            if (!_.isEmpty(validSignalsArray)) {
                if ( signalsInitialArray.length > 100) {
                    signalsInitialArray.splice(0, 50);
                }
                signalsInitialArray = signalsInitialArray.concat(validSignalsArray);
                await createAndBroadcastPost(validSignalsArray);
                break
            }
            await new Promise(resolve => setTimeout(resolve, 300000));
        }
    })();
}, null, false, null, null, false);

job.start();
