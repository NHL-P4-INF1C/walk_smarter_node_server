module.exports = () => {
    return async (req, res, next) => {
        const token = req.headers['jwt'];     
        const secretJWT = process.env.JWT;
        
        if (token && token === secretJWT) {
            next();
        } else {
            res.status(401).json({ error: 'Unauthorized' });
        }
    };
};
