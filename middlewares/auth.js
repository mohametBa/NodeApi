const UnauthorizedError = require("../errors/unauthorized");
const jwt = require("jsonwebtoken");
const config = require("../config");
const User = require("../api/users/user.model"); 

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      throw "No token provided.";
    }
    const decoded = jwt.verify(token, config.secretJwtToken);

    if (!decoded || !decoded.id) {
      throw "Invalid token.";
    }

    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      throw "User not found.";
    }

    req.user = user;
    next();
  } catch (error) {
    const message = typeof error === 'string' ? error : (error.message || "Unauthorized.");
    next(new UnauthorizedError(message));
  }
};
