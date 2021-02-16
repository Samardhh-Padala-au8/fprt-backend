const { validationResult } = require("express-validator");
const Seller = require("../models/sellerModel");
// const jwt = require('jsonwebtoken')


const sellerController = {};

/**
 *@desc     Register new user
 *@route    POST /user/register
 *@access   Public
 **/
sellerController.register = async function (req, res, next) {
    if (!validationResult(req).isEmpty()) {
        return res
            .status(200)
            .json({ success: false, message: "VALIDATION_ERROR", error: { status: 400, errors: validationResult(req).mapped() } });
    }
    try {
        let existingUser = await Seller.findOne({ email: req.body.email });
        if (existingUser) {
            res.status(200).json({ success: false, message: "AUTH_ERROR", error: { status: 409, msg: "User already exist! Please login." } });
        } else {
            // Create a new user
            const user = new Seller(req.body);
            await user.save();
            const token = await user.generateAuthToken()
            return res.status(200).json({ success: true, message: 'Registered successfully!', user: { name: user.name, email: user.email }, token })
        }
    } catch (error) {
        next(error);
    }
};


sellerController.login = async function (req, res, next) {
    if (!validationResult(req).isEmpty()) {
        //Check if there is any validation error.
        return res
            .status(200)
            .json({ success: false, message: "VALIDATION_ERROR", error: { status: 400, errors: validationResult(req).mapped() } });
    }
    try {
        //Check if user exist
        const user = await Seller.findByCredentials(req.body.email, req.body.password)
        if (user === 'password incorrect') {
            return res.status(200).json({ success: false, message: 'AUTH_ERROR', error: { status: 400, message: 'Password incorrect!' } })
        }
        if (user) {
            const token = await user.generateAuthToken()
            return res.status(200).json({ success: true, message: 'Logged in successfully!', user: { _id: user._id, name: user.name, email: user.email, gender: user.gender, imagelink: user.imagelink, role: user.role }, token })
        }
        else {
            return res.status(200).json({ success: false, message: 'AUTH_ERROR', error: { status: 400, message: 'User doesnt exist! Please register first.' } })
        }
    } catch (error) {
        next(error);
    }
};

sellerController.logout = async function (req, res, next) {
    try {
        const user = req.user
        user.tokens = user.tokens.filter((token) => {
            return token.token != req.token;
        });
        await user.save()
        res.status(200).json({ success: true, message: 'Logged out successfully!' })
    } catch (error) {
        next(error);
    }
};

sellerController.getprofile = async function (req, res, next) {
    try {

        const user = req.user
        const objectuser = user.toObject()
        delete objectuser.tokens
        return res.status(200).json({ success: true, userProfile: objectuser })
    } catch (error) {
        next(error);
    }
};

module.exports = sellerController
