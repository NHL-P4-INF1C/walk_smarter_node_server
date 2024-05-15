const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    res.json({ message: 'Public route, no authentication required' });
});

module.exports = router;