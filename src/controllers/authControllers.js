const { MongoClient } = require('mongodb');
const conf = require('../conf');
const dbUrl = conf.dbUrl;
const dbName = conf.dbName;


function addTraaanskt(wieVielX, zahlungsempfaaaengerX, ibaaanX, betraaagX, verwendungszweeeckX, ausfuehrungsdaaatumX, callback) {
    // here i will add rest (maybe to use later as rest positive number that resulted right after xxx) and i will add gesamt as well
    (async function mongo() {
        let client;
        try {
            client = await MongoClient.connect(dbUrl, { useNewUrlParser: true });
            const db = client.db(dbName);
            const response = await db.collection('umsaatz').insertOne({
                wieViel: wieVielX,
                zahlungsempfaaaenger: zahlungsempfaaaengerX,
                ibaaan: ibaaanX,
                betraaag: betraaagX,
                verwendungszweeeck: verwendungszweeeckX,
                ausfuehrungsdaaatum: ausfuehrungsdaaatumX,

            });
            console.log(response)
            client.close();
            callback(response);

        } catch (error) {
            console.log(error.message);
            client.close();
            callback(false)

        }
    }())
}

// this function is extra
function checkUserforlogin(userName, password, callback) {
    (async function mongo() {
        let client;
        try {
            client = await MongoClient.connect(dbUrl, { useNewUrlParser: true });
            const db = client.db(dbName);
            const col = await db.collection('users');
            const user = await col.findOne({
                userName: userName,
                password: password,
            });

            client.close();
            callback(user)

        } catch (error) {
            console.log(error.message)
            client.close();
            callback(null)

        }
    }())
}



module.exports = { addTraaanskt, checkUserforlogin }