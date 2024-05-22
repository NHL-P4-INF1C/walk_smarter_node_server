const express = require('express');
const router = express.Router();
const pocketbaseClient = require('../pocketbase/pocketbaseClient');

router.post('/test', async (req, res) => {
    try {
        const records = await pocketbaseClient.collection('users').getList();
        res.status(200).json(records);
    } catch (error) {
        console.error('Error in POST /test:', error);
        res.status(500).json({ error: 'Error' });
    }
});

module.exports = router;