const { validationResult } = require("express-validator");
const Categories = require("../models/categoryModel");

const categoryController = {};




categoryController.addpost = async function (req, res, next) {
    if (!validationResult(req).isEmpty()) {
        //Check if there is any validation error.
        return res
            .status(200)
            .json({ success: false, message: "VALIDATION_ERROR", error: { status: 400, errors: validationResult(req).mapped() } });
    }
    try {
        const { categoryId, categoryname } = req.body
        const post = await Categories.findOne({ categoryname })
        if (post) {
            return res.status(200).json({ success: false, message: "CONFLICT_ERR", error: { status: 403, message: 'category already exist!' } })
        }
        else {
            //crate a new entry
            console.log(req.user.role)
            if (req.user.role === "seller") {
                const post = new Categories({ categoryId,categoryname })
                await post.save()
                return res.status(201).json({ success: true, message: "Successfully added Category!" })
            }
            else {
                return res.status(200).json({ success: false, message: "CONFLICT_ERR", error: { status: 403, message: 'only seller can add category' } })
            }
        }
    } catch (error) {
        next(error);
    }
};

categoryController.getpost = async function (req, res, next) {
    try {
        const posts = await Categories.find({})
        return res.status(200).json({ success: true, data: posts })

    } catch (error) {
        next(error);
    }
};

module.exports = categoryController