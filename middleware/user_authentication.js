module.exports = (validHash) => {
    const pocketbaseClient = require('../pocketbase/pocketbaseClient');


    return (req, res, next) => {
        
        const userHash = req.query.hash;
        if (userHash && userHash === validHash) {
            next();
        } else {
            res.status(401).json({ error: 'Unauthorized' });
        }
    };
};
