const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  let token;

  token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      next(new Error("Not authorized, token failed"));
    }
  } else {
    res.status(401);
    next(new Error("Not authorized, no token"));
  }
};

module.exports = protect; // export { protect };
