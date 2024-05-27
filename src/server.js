const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const PORT = process.env.PORT || 3000;
const DEV_ENV = process.env.DEV_ENV === "DEVELOPMENT";
const DATABASE_PUBLIC_HASH = process.env.DATABASE_PUBLIC_HASH || "random_test_hash";

const requestAuthentication = require('../middleware/requestAuthentication')();

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


// String formatting
// const test_string = "{\"response\": \"Het Concertgebouw, located in Amsterdam, Netherlands, is one of the world's most renowned concert halls, celebrated for its exceptional acoustics and rich history. Opened in 1888, the venue is home to the Royal Concertgebouw Orchestra and hosts a wide array of performances, including classical music, jazz, and world music. The building's design, by architect Adolf Leonard van Gendt, features a neoclassical facade and an elegantly decorated interior, making it a cultural landmark in Amsterdam. With over 900 concerts annually, Het Concertgebouw attracts visitors and performers from all over the globe, contributing significantly to the city's cultural heritage.\"}"

// console.log(test_string.replace('\"', '"'))