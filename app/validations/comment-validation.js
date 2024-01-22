const Comment = require('../model/comment-model')


const commentValidationSchema = {
    content:{
        notEmpty:{
            errorMessage: 'content is required'
        }
    }
}
module.exports = {commentSchema:commentValidationSchema}