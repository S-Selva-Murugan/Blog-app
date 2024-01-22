const Post = require('../model/post-model')

const postValidationSchema = {

    title:{
        notEmpty:{
            errorMessage : 'title is required'
        }
    },
    content:{
        notEmpty:{
            errorMessage: 'content is required'
        }
    }
}
module.exports = {postSchema:postValidationSchema}