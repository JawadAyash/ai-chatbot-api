const jwt = require("jsonwebtoken");

const createToken = (userId, role) => {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = createToken;