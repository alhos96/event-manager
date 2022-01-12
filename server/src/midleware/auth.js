const jwt = require("jsonwebtoken");
const config = require("../../config");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      res.status(400).json({ message: "Authentication failed!" });
      throw new Error("Authentication failed!");
    }

    const decodedToken = jwt.verify(token, config.secret);
    req.userData = { userId: decodedToken.userId, userName: decodedToken.userName };
    next();
  } catch (error) {
    const err = new Error("Authentication failed!", 403);
    return next(err);
  }
};
