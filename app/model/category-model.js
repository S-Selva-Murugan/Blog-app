const mongoose = require('mongoose')

const {Schema, model} = mongoose

const categorySchema = new Schema ({
    name:String,
    description:String,
    posts:[{types:Schema.Types.ObjectId,ref:'Post'}]
},{timestamps:true})

const category = model('Category',categorySchema)

module.exports = category