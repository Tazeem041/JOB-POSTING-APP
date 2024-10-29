const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  }

  if (err.name === "CastError" && err.kind === "ObjectId") {
    return res.status(404).json({ error: "Resource not found" });
  }

  if (err.code === 11000) {
    return res.status(400).json({ error: "Duplicate key error" });
  }

  res.status(500).json({
    error: "Something went wrong on the server",
    details: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
};

module.exports = errorHandler;
