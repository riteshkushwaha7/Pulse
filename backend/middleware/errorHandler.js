const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({ error: messages.join(', ') });
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return res.status(400).json({ error: `${field} already exists` });
  }

  if (err.message === 'Post must have either text or imageUrl') {
    return res.status(400).json({ error: err.message });
  }

  res.status(err.statusCode || 500).json({ 
    error: err.message || 'Internal server error' 
  });
};

module.exports = errorHandler;
