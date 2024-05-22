const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const PORT = process.env.PORT || 3001;
const DEV_ENV = process.env.DEV_ENV === "DEVELOPMENT";
const DATABASE_PUBLIC_HASH = process.env.DATABASE_PUBLIC_HASH || "random_test_hash";

console.log(DATABASE_PUBLIC_HASH);

const requestAuthentication = require('./middleware/requestAuthentication')();

const apiRoutes = require('./routes/test_auth_requests');

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
