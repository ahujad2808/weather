const { MongoClient } = require("mongodb");

const url = "mongodb+srv://kunaalgupta:kDGpvJLZDibg7PbR@clusterinit.ss7ajbc.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);

async function RegisterCred(Username, Password, Name, City) {
    try {
        await client.connect();

        const db = client.db('WeatherSenseDB');
        const col = db.collection('LoginAuthentication');

        const query = { 'Username': Username, 'Password': Password, 'Name': Name, 'City': City };
        const result = await col.findOne(query);

        console.log('hihiiiiiiiii', result)
        

        if (result) {
            return 1;
        } else {
            const result = await col.insertOne(query);
            if (result) {
                return 2;
            } else {
                return 0
            }
        }
    }
    finally {
        await client.close();
    }

}


module.exports = { RegisterCred };


