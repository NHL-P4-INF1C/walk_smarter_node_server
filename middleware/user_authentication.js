const DATABASE_PUBLIC_HASH = process.env.DATABASE_PUBLIC_HASH || "random_test_hash";

module.exports = (validHash) => {
    return (req, res, next) => {
        const userHash = req.headers.hash;
        if (userHash && userHash === DATABASE_PUBLIC_HASH) {
            next();
        } else {
            res.status(401).json({ error: 'Unauthorized' });
        }
    };
};
