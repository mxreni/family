exports.isAuthenticated = (req, res, next) => {
  console.log(req.isAuthenticated());
  if (req.isAuthenticated()) {
    next();
  } else {
    return res.status(401).json({
      status: "failed",
      message: "unauthorized",
    });
  }
};
