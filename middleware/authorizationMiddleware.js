const validSourceKey = process.env.SOURCE_KEY; // Define your valid key in environment variables

const checkSourceKey = (req, res, next) => {
  const sourceKey = req.headers['source-key'];

  if (sourceKey === validSourceKey) {
    next(); // Key is valid, proceed to the next middleware or route handler
  } else {
    res.status(403).json({ error: 'Forbidden', message: 'Invalid Source-Key' });
  }
};

module.exports = checkSourceKey;
