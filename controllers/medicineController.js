const { validationResult } = require("express-validator");
const Medicines = require("../models/medicineModel");

const medicineController = {};




medicineController.addpost = async function (req, res, next) {
    if (!validationResult(req).isEmpty()) {
        //Check if there is any validation error.
        return res
            .status(200)
            .json({ success: false, message: "VALIDATION_ERROR", error: { status: 400, errors: validationResult(req).mapped() } });
    }
    try {
        const { medicinename, categoryname, description, medicineimagelink, price } = req.body
        const post = await Medicines.findOne({ medicinename })
        if (post) {
            return res.status(200).json({ success: false, message: "CONFLICT_ERR", error: { status: 403, message: 'medicine already exist!' } })
        }
        else {
            //crate a new entry
            console.log(req.user.role)
            if (req.user.role === "seller") {
                const post = new Medicines({ medicinename, categoryname, description, medicineimagelink, price })
                await post.save()
                return res.status(201).json({ success: true, message: "Successfully added Medicine!" })
            }
            else {
                return res.status(200).json({ success: false, message: "CONFLICT_ERR", error: { status: 403, message: 'only seller can add medicines' } })
            }
        }
    } catch (error) {
        next(error);
    }
};

medicineController.getpost = async function (req, res, next) {
    try {
        console.log(req.query)
        const { search, categoryname } = req.query
        console.log(search,categoryname)
        let posts;
        
            if (search.length > 0) {
                posts = await Medicines.find({ medicinename: { '$regex': `${search}`, '$options': 'i' } })
            }
            else if(categoryname.length>0){
                posts = await Medicines.find({ categoryname })
            }
            else
            {
                posts = await Medicines.find({})
            }

        return res.status(200).json({ success: true, data: posts })

    } catch (error) {
        next(error);
    }
};


medicineController.getmedi = async function (req, res, next) {
    try {
        const medicinename = req.params.name
        let posts;
        posts = await Medicines.findOne({medicinename})    
        return res.status(200).json({ success: true, data: posts })

    } catch (error) {
        next(error);
    }
};

module.exports = medicineController