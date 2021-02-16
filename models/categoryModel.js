const mongoose = require('mongoose')


const categorySchema = new mongoose.Schema({
    categoryId: {
        type: String,
        required: true
      },
   categoryname:{
     type:String,
     required:true
   },

},{
    collection: 'categories'
  },{ timestamps: true })

const Category = mongoose.model("categories", categorySchema);

module.exports = Category;