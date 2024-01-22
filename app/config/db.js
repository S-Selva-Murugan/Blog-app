const mongoose = require('mongoose')
const configDB = async ()=>{
    try{
        const db = await mongoose.connect('mongodb://127.0.0.1:27017/blog')
        console.log('connected to db')
    } catch (e) {
        console.log('error in connecting to db')
    }
}
module.exports = configDB