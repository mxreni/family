function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    return res.status(401).json({
      status: "failed",
      message: "unauthorized",
    });
  }
}

module.exports = isAuthenticated;
