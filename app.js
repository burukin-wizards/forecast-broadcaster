const {PrivateKey} = require('dsteem');
const _ = require('lodash');
const {CronJob} = require('cron');
const express = require('express');

const {getSignals, getRates, getWobjects} = require('./api/index');
const {signalsConverter, signalsProcessor} = require('./signalsProcessor');
const {postConstructor} = require('./postConstructor');
const {postBroadcaster} = require('./postBroadcaster');
const {signalValidator, rateValidator, wobjectValidator} = require('./validator');
const accountsData = require('./constants/accountsData');

function normalizePort(val) {
    let port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

const app = express();
let port = normalizePort(process.env.PORT || '5000');
app.listen('port', port);

const getAccount = function () {
    return {
        index: 0,
        accData: accountsData,
        length: accountsData.length,
        getNext: function () {
            let account;
            if (!this.hasNext()) {
                this.resetIndex();
            }
            account = this.accData[this.index];
            this.index = this.index + 1;
            return account;
        },
        hasNext: function () {
            return this.index < this.length;
        },
        resetIndex: function () {
            this.index = 0;
        },
    };
};

const botsAcc = getAccount();

var signalsInitialArray;

async function getValidSignals(initialArray) {
    try {
        const newSignals = await getSignals();
        const newSignalsArray = signalsConverter(newSignals);

        return signalsProcessor.findUniqueSignals(newSignalsArray, initialArray)
            .filter(signal => signalsProcessor.signalFilter(signal))
            .filter(signal => signalValidator(signal));
    } catch (e) {
        console.error(e.message);
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

(async () => {
    try {
        const initialSignals = await getSignals();
        signalsInitialArray = signalsConverter(initialSignals)
            .filter(signal => signalValidator(signal))
            .filter(signal => signalsProcessor.signalFilter(signal));

        console.log('initial signals length', signalsInitialArray.length);
    } catch (e) {
        console.error(e);
    }
})();

const job = new CronJob('0 0 7-21/2 * * *', async () => {
    (async () => {
        for (let i = 0; i < 20; i++) {
            console.log('Looking for a new signals...');
            let validSignalsArray = await getValidSignals(signalsInitialArray);
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

module.exports = {
    getValidSignals,
    getAccount
};
