const Course = require('../../models/Course');
const util = require("../../utils/utils");

module.exports = {
    postAuth: function (req, res, next) {
        if (util.checkRole(req.currUser, 'admin')
        ) {
            next();
        }
        else {
            res.send('invalid authorization');
        }
    },

    putAuth: function (req, res, next) {
        if (
            util.checkRole(req.currUser,'admin')
        ) {
            next();
        } else {
            res.send("please you don't have a permission to edit the field");
        }
    },

    listAllAuth: function (req, res, next) {
        if(req.currUser.role == 'admin' || 
            req.currUser.role == 'manager' ||
            req.currUser.role == 'user'
            ) {
            next();
        }else {
            res.send("please you don't have a permission to list the fields");
        }
    },
    
    getDetailAuth: function (req, res, next) {
        if (util.checkRole(req.currUser, 'admin') ||
            util.checkRole(req.currUser,'manager') ||
            util.checkRole(req.currUser,'user') 
        ) {
            next();
        } else {
            res.send("please don't have a permission to get the field");
        }
    },

    deleteAuth: function (req, res, next) {
        if (util.checkRole(req.currUser, 'admin') ||
            util.checkRole(req.currUser,'manager')
        ) {
            next();
        } else {
            res.send("please don't have a permission to delete the field");
        }
    }
}