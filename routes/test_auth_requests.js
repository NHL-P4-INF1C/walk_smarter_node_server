const express = require('express');
const router = express.Router();
const pocketbaseClient = require('../pocketbase/pocketbaseClient');

router.post('/test', async (req, res) => {
    try {
        // const records = await pocketbaseClient.collection('users').getList();
        const records = '"test":"test"';
        res.status(200).json(records);
      } catch (error) {
        res.status(500).json({ error: 'Error' });
      }
});

module.exports = router;