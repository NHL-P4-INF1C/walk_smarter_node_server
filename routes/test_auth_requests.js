const express = require('express');
const client = require('../openai/openaiClient');
const router = express.Router();
const pocketbaseClient = require('../pocketbase/pocketbaseClient');
const bodyParser = require("body-parser");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/test', async (req, res) => {
    try {
        const records = await pocketbaseClient.collection('users').getList();
        res.status(200).json(records);
    } catch (error) {
        console.error('Error in POST /test:', error);
        res.status(500).json({ error: 'Error' });
    }
});

router.post('/test_openai', async (req, res) => {
    try {
        const payload = req.body.payload;
        const pointOfInterest = payload["pointOfInterest"];
        const locationOfOrigin = payload["locationOfOrigin"];

        if (payload === undefined || payload == "")
            res.sendStatus(401);
        if(pointOfInterest === undefined || pointOfInterest == "")
            res.sendStatus(401);
        if(locationOfOrigin === undefined || locationOfOrigin == "")
            res.sendStatus(401)

        const messages = [
            { role: 'system', content: 'You are a historian, heritage expert, historical site specialist and cultural heritage expert.' },
            { role: 'user', content: `Hello, Please provide me with some usefull knowledge about ${pointOfInterest} that is located in ${locationOfOrigin}.` }
        ];

        client.generateResponse(messages)
        .then(response => {
        console.log('Response:', response);
        res.json(response);
        })
        .catch(error => {   
        console.error('Error:', error);
        res.sendStatus(200);
        });
          
    } catch (error) {
        console.error('Error in POST /test:', error);
        res.status(500).json({ error: 'Error' });
    }
});

module.exports = router;
