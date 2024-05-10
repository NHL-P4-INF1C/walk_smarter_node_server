const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("Hello, World");
});

app.get('/param_test', (req, res) => {
    const param = req.query.param;
    res.send(`Given parameter: ${param}`);
});

app.post('/param_test', (req, res) => {
    const { param } = req.body;

    if(param === undefined)
        res.send("No params found");
    else
        res.send(`Given parameter: ${param}`)
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})