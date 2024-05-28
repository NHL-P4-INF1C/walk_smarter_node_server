const express = require("express");
const bodyParser = require("body-parser");


const { createHash } = require('crypto');

const pocketbaseClient = require('../pocketbase/pocketbaseClient');

const app = express();

const PORT = process.env.PORT || 3000;
const DEV_ENV = process.env.DEV_ENV === "DEVELOPMENT";

try {
    await pocketbaseClient.loginAsAdmin();

    const oldHash = await pocketbaseClient.getClient().collection('api').getList(1, 1, { sort: '-created' });

    const data = {
        "hash": createHash('sha256').update(oldHash['items'][0]['hash'] + oldHash['items'][0]['id']).digest('hex')
    };

    const record = await pocketbaseClient.getClient().collection('api').create(data);

    console.log(record);

    const requestAuthentication = require('../middleware/requestAuthentication')(record['hash']);

    const apiRoutes = require('../routes/test_auth_requests');

    app.use('/api', requestAuthentication);

    app.use('/api', apiRoutes);

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.listen(PORT, () => {
        if (DEV_ENV) {
            console.log("Detected development environment!");
        }

        console.log(`Server is running on http://localhost:${PORT}`);
    });

}
catch (error) {
    console.log(error)
}
finally {
    await pocketbaseClient.logoutAdmin(); 
}
