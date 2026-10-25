// Runs when no route matches (404)
const notFound = (req, res) => {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
};

// Runs when next(error) is called or something throws. It needs all 4 parameters.
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  // Mongoose validation failed (e.g. title missing or too short)
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ message: "Validation failed", errors });
  }

  // Wrong type for a field or a bad id format
  if (err.name === "CastError") {
    return res.status(400).json({ message: `Invalid value for ${err.path}` });
  }

  // Broken JSON in the request body
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ message: "Invalid JSON in request body" });
  }

  // Anything else is a server error. Details are logged, not sent to the client.
  console.error(err);
  res.status(500).json({ message: "Something went wrong on the server" });
};

module.exports = { notFound, errorHandler };
