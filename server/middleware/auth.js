const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")
      ? req.header("Authorization").replace("Bearer ", "")
      : "";
    if (!token) {
      throw Error("Authorization token missing.");
    }
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const user = await User.findOne({ where: { id: decoded.id } });
    if (!user) {
      throw Error("User Verification failed");
    }
    req.currUser = user;
    next();
  } catch (e) {
    res.status(401).send({ error: e.message });
  }
};
module.exports = auth;
