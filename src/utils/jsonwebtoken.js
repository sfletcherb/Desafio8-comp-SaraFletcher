const jwt = require("jsonwebtoken");

const privateKey = "palabrasecretaparatoken";

const generateToken = (user) => {
  const token = jwt.sign(user, privateKey, { expiresIn: "24h" });
  return token;
};

module.exports = generateToken;
