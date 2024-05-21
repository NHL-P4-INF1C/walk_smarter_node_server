const express = require('express');
const router = express.Router();
const pocketbaseClient = require('../pocketbase/pocketbaseClient');

router.get('/test', async (req, res) => {
    try {
        const records = await pocketbaseClient.collection('users').getList();
        res.status(201).json(records);
      } catch (error) {
        console.error('Error creating record:', error);
        res.status(500).json({ error: 'Error creating record' });
      }
});

module.exports = router;