module.exports = (authKey) =>
{
  return (req, res, next) =>
  {
    const token = req.headers['jwt'];

    if (token && token === authKey)
    {
      next();
    }
    else
    {
      res.status(401).json({ error: 'Unauthorized' });
    }
  };
};
