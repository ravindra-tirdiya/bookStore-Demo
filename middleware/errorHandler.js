export function notFound(_req, res, _next) {
  res.status(404).json({ message: 'Route not found' });
}

export function general(err, _req, res, _next) {
  console.error(err);
  res.status(500).json({ message: err.message || 'Server error' });
}
