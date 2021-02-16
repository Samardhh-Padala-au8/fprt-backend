const mongoose = require('mongoose')


const medicineSchema = new mongoose.Schema({
    medicinename: {
        type: String,
        required: true
    },
    categoryname: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    medicineimagelink: {
        type: String,
        default:"https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1954&q=80"
    },
    price: {
        type: Number,
        required: true
    }

}, {
    collection: 'medicines'
}, { timestamps: true })

const Library = mongoose.model("medicines", medicineSchema);

module.exports = Library;