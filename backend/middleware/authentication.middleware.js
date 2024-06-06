const jwt = require("jsonwebtoken");
const jwtKey = process.env.JWT_SECRET;

const authentication = async (req, res, next) => {
  const accessToken = req.headers.authorization?.split(" ")[1];
  if (!accessToken) {
    return res
      .status(401)
      .json({ success: false, message: "Access token is missing" });
  }
  try {
    const decoded = jwt.verify(accessToken, jwtKey);
    req.userData = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(419).json({ success: false, message: "Token expired" });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Invalid access token" });
    }
  }
};

module.exports = authentication;
