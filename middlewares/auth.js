const UnauthorizedError = require("../errors/unauthorized");
const jwt = require("jsonwebtoken");
const config = require("../config");
const User = require("../api/users/users.model");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      throw new UnauthorizedError("No token provided.");
    }

    const decoded = jwt.verify(token, config.secretJwtToken);
    if (!decoded || !decoded.userId) {
      throw new UnauthorizedError("Invalid token.");
    }

    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      throw new UnauthorizedError("User not found.");
    }

    req.user = user;
    next();
  } catch (error) {
    next(error instanceof UnauthorizedError ? error : new UnauthorizedError(error.message || "Unauthorized."));
  }
};
