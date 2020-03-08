const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();
const Amadeus = require("amadeus");
module.exports = {
  smtpTransport: nodemailer.createTransport({
    service: process.env.MAILER_SERVICE_PROVIDER,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD
    }
  }),
  jwtEncode: function(paylod) {
    let token = jwt.sign(paylod, process.env.JWT_KEY);
    return token;
  },
  jwtDecode: function(token) {
    let paylodDecoded = jwt.verify(token, process.env.JWT_KEY);
    return paylodDecoded;
  },
  sendResponse: function(result, req, res) {
    res.json(result);
  },
  sendResponseFile: function(result, req, res) {
    if (
      result.err != undefined &&
      result.err != null &&
      result.err.length > 0
    ) {
      res.status(400).send(result.err);
    } else {
      res.download(result);
    }
  },
  checkRole: (user, role) => {
    for (i = 0; i < user.role.length; i++) {
      if (user.role[i] == role) {
        return true;
      }
    }
    return false;
  },
  ucfirst: str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },
  logIt: (message, type) => {
    //type-> info,error
    if (type == "error") {
      console.error("=====" + new Date().toString() + "=====");
      console.error(message);
    } else if (type == "info") {
      console.log("=====" + new Date().toString() + "=====");
      console.log(message);
    }
  }
};
