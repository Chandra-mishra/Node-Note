const User = require("../models/User");
const jwt = require("jsonwebtoken");
const Sequelize = require("sequelize");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const Op = Sequelize.Op;
module.exports = {
  add: async function(user, currUser, next) {
    const saltRounds = 10;
    let result = null;
    try {
      let usr = await User.findOne({
        where: { email: user.email }
      });

      if (usr) {
        throw new Error("Email Already Registerd");
      } else {
        let salt = bcrypt.genSaltSync(saltRounds);
        let hash = bcrypt.hashSync(user.password, salt);
        user.password = hash;
        result = await User.create(user);
        return result;
      }
    } catch (err) {
      next(err);
    }
  },

  edit: async function(user, currUser, next) {
    let result = null;
    try {
      if (user.password) {
        const saltRounds = 10;
        let salt = bcrypt.genSaltSync(saltRounds);
        let hash = bcrypt.hashSync(user.password, salt);
        user.password = hash;
      }
      result = await User.update(
        {
          ...user
        },
        { where: { id: user.id } }
      );
      if (result.includes(1)) {
        result = "Updated Successfully";
      } else {
        result = "Something went wrong try again";
      }
      return result;
    } catch (err) {
      next(err);
    }
  },

  delete: async function(id, next) {
    let result = null;
    try {
      result = await User.destroy({ where: { id: id } });
      return { message: " user deleted successfully" };
    } catch (err) {
      next(err);
    }
  },

  list: async function(start, length, searchQry, next) {
    let result = null;
    try {
      let whereClause = {};
      Object.keys(searchQry).forEach(el => {
        whereClause[el] = { [Op.like]: "%" + searchQry[el] + "%" };
        console.log(searchQry[el], "dd");
      });
      result = await User.findAndCountAll({
        where: whereClause,
        offset: start,
        limit: length,
        order: [["createdAt", "DESC"]]
      });
      return result;
    } catch (err) {
      next(err);
    }
  },

  get: async function(id) {
    let result = null;
    try {
      result = await User.findOne({ where: { id } });
      if (!result) {
        return (result = {
          error: "User Not Found"
        });
      }
      return result;
    } catch (err) {
      return { error: err.message };
    }
  },

  login: async function(email, password, next) {
    let result;
    let token = null;
    try {
      let user = await User.findOne({
        where: { email: email },
        attributes: { include: ["password"] }
      });
      if (!user) {
        throw Error("Email Not Registerd");
      }
      let isMatched = await bcrypt.compare(password, user.password);
      if (!isMatched) {
        throw Error(" Email or Password is Incorrect");
      }
      user.password = undefined;
      token = await jwt.sign(
        { email: user.email, id: user.id },
        process.env.JWT_KEY
      );
      return {
        result: user,
        token,
        message: "Login Successfull"
      };
    } catch (err) {
      next(err);
    }
  },
  reSetPassword: async function(token, newPassword, verifyPassword) {
    let validation = true;
    let result = { data: null, err: null };
    try {
      if (validation) {
        result.data = await User.findOne({ reset_password_token: token }); //,reset_password_expires:{$gt: Date}});
        if (result.data) {
          if (newPassword === verifyPassword) {
            result.data.password = bcrypt.hashSync(newPassword, 10);
            result.data.reset_password_token = undefined;
            result.data.reset_password_expires = undefined;
            await result.data.save();
            let transporter = await nodemailer.createTransport({
              host: process.env.EMAIL_HOST,
              port: process.env.EMAIL_PORT,
              secure: false, // true for 465, false for other ports
              auth: {
                user: process.env.email,
                pass: process.env.EMAIL_PASSWORD
              }
            });
            let info = await transporter.sendMail({
              from: process.env.email,
              to: result.data.email,
              subject: "Password Reset Confirmation",
              text:
                "This is a confirmation that the password for your account " +
                result.data.email +
                " has just been changed.\n"
            });
          } else {
            result.err = `your password does't match`;
          }
        } else {
          result.err = [
            `Sorry your link is expired, generate new link through forget password`
          ];
        }
      }
    } catch (err) {
      result.err = [err];
    }
    return result;
  },
  forgotPassword: async function(email) {
    let validation = true;
    let result = { data: null, err: null };
    try {
      if (validation) {
        result.data = await User.findOne({ email });
        if (result.data) {
          token = crypto.randomBytes(20).toString("hex");
          result.data.reset_password_token = token;
          result.data.reset_password_expires = Date.now() + 86400000;
          await result.data.save();
          let transporter = await nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: false, // true for 465, false for other ports
            auth: {
              user: process.env.email,
              pass: process.env.EMAIL_PASSWORD
            }
          });
          let info = await transporter.sendMail({
            from: process.env.email,
            to: result.data.email,
            subject: "Password help has arrived!",
            text:
              "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
              "Please click on the following link, or paste this into your browser to complete the process:\n\n" +
              process.env.Frontend_Base_URL +
              "/reset/" +
              token +
              "\n\n" +
              "If you did not request this, please ignore this email and your password will remain unchanged.\n"
          });
        } else {
          result.err = ["Validation failed"];
        }
      }
    } catch (err) {
      result.err = [err];
    }
    return result;
  }
};

// User.sync({ force: true }).then(async function() {
//   let r = await User.create(user);
//   console.log(r, "ddsssd");
// });
