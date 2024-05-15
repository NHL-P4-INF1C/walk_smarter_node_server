const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => {
    res.json({ message: 'Did the authentication work?' });
});

module.exports = router;